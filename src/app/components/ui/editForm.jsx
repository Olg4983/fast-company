/* eslint-disable */
import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import { useHistory } from "react-router-dom";

const EditForm = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();
    // const [data, setData] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleClick = () => {
        api.users.update(userId, user).then((data) => setUser(data));
        history.push("/users/" + userId);
    };

    if (user) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                onChange={handleChange}
                                value={user.profession.name}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберете ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={[]}
                                name="qualities"
                                label="Выберете ваши качества"
                            />

                            <button
                                type="submit"
                                onClick={handleClick}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1>Loading</h1>{" "}
                    </div>{" "}
                </div>{" "}
            </div>
        );
    }
};

export default EditForm;
