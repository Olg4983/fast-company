import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import BookMark from "./bookmark";

const User = ({ user, status, ...rest }) => {
    const getUserQualities = (user) => {
        return user.qualities.map((quality) => (
            <Quality
                key={quality._id}
                color={quality.color}
                name={quality.name}
            />
        ));
    };

    return (
        <tr>
            <td>{user.name}</td>
            <td>{getUserQualities(user)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <BookMark status={user.status} userId={user._id} {...rest} />
            </td>
            <td>
                <button
                    className="btn btn-warning btn-sm m-2"
                    onClick={() => {
                        rest.onDelete(user._id);
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    status: PropTypes.bool.isRequired
};
export default User;
