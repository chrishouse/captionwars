import React from "react";
import EntryDate from "./EntryDate";
import EntryInfo from "./EntryInfo";

const Entry = () => {
    return (
        <div className="entry">
            <EntryDate />
            <EntryInfo />
        </div>
    );
};

export default Entry;
