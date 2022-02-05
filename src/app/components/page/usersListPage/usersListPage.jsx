/* eslint-disable */
import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import UserPage from "../userPage/userPage";
import _ from "lodash";
import { useParams } from "react-router-dom";

import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const pageSize = 8;
    const params = useParams();
    const { userId } = params;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState();

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };
    const handleSearch = ({ target }) => {
        setSearch(target.value);
        setSelectedProf();
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        let filtredUsers;
        if (selectedProf) {
            filtredUsers = users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            );
            console.log(filtredUsers);
        } else if (search) {
            filtredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase().trim())
            );
        } else filtredUsers = users;

        const count = filtredUsers.length;
        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                {userId ? (
                    <UserPage users={userCrop} id={userId} />
                ) : (
                    <div className="d-flex">
                        {professions && (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onItemSelect={handleProfessionSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column">
                            <SearchStatus length={count} />
                            <TextField
                                name="search"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search..."
                            />

                            {count > 0 && (
                                <UsersTable
                                    users={userCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    onDelete={handleDelete}
                                    onToggleBookMark={handleToggleBookMark}
                                />
                            )}
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    onPageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array.isRequired
};
export default UsersListPage;
