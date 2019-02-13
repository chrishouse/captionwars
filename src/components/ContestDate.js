import React from "react";

const ContestDate = props => {
    return (
        <section className="contest-date">{props.contestData[0].date}</section>
    );
};

export default ContestDate;
