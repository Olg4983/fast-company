import React, { useState } from "react";
import api from "../api";

const Users = () => {
  console.log(api.users.fetchAll());
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };
  const renderPhrase = (number) => {
    if (number === 2 || number === 3 || number === 4)
      return `${number} человека тусанут с тобой сегодня`;
    return `${number} человек тусанет с тобой сегодня`;
  };
  const getBageClasses = () => {
    let classes = "badge m-2 ";
    classes += users.length === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };

  const getUserQualities = (user) => {
    return user.qualities.map((quality) => (
      <span key={quality._id} className={`badge m-2 bg-${quality.color}`}>
        {quality.name}
      </span>
    ));
  };

  const getTableBody = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{getUserQualities(user)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <button
            className="btn btn-warning btn-sm m-2"
            onClick={() => {
              handleDelete(user._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h1>
        <span className={getBageClasses()}>{renderPhrase(users.length)}</span>
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{getTableBody()}</tbody>
      </table>
    </>
  );
};

export default Users;
