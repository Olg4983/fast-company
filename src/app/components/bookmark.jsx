import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, userId, ...rest }) => {
    return (
        <button onClick={() => rest.onToggleBookMark(userId)}>
            <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool,
    userId: PropTypes.number
};

export default BookMark;
