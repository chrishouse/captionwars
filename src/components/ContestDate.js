import React from "react";
import PropTypes from "prop-types";

const ContestDate = props => {
    return <section className="contest-date">{props.contestDate}</section>;
};

ContestDate.propTypes = {
    contestDate: PropTypes.string
};

export default ContestDate;
