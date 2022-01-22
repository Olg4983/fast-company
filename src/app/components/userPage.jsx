import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";
const UserPage = ({ users, id }) => {
    const history = useHistory();
    const getUserById = (id) => {
        return users.find((user) => user._id === id.toString());
    };

    const user = getUserById(id);
    const handleRenderAllUsers = () => {
        history.push("/users");
    };
    console.log(user);
    return (
        <>
            <div>
                <h2>{user ? user.name : `User with id:${id} not found`}</h2>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <h6>CompletedMeetings: {user.completedMeetings}</h6>
                <h2>Rate: {user.rate}</h2>
            </div>
            <button
                onClick={() => {
                    handleRenderAllUsers();
                }}
            >
                Все пользователи
            </button>
        </>
    );
};

UserPage.propTypes = {
    users: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired
};

export default UserPage;
