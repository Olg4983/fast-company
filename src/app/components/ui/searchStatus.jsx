import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        if (number === 2 || number === 3 || number === 4) {
            return `${number} человека тусанут с тобой сегодня`;
        }
        if (number === 0) {
            return "Никто не тусанет с тобой сегодня";
        }
        return `${number} человек тусанет с тобой сегодня`;
    };
    const getBageClasses = () => {
        let classes = "badge m-2 ";
        classes += length === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };
    return (
        <>
            <h1>
                <span className={getBageClasses()}>{renderPhrase(length)}</span>
            </h1>
        </>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
