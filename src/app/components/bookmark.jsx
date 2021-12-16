import React from "react";

const BookMark = ({ status, userId, ...rest }) => {
  return (
    <button onClick={() => rest.onToggleBookMark(userId)}>
      <i class={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
    </button>
  );
};

export default BookMark;
