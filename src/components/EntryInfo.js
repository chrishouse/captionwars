import React from "react";
import EntryLikes from "./EntryLikes";
import EntryUser from "./EntryUser";

const EntryInfo = () => {
    return (
        <div className="entry-info">
            <EntryLikes />
            <EntryUser />
        </div>
    );
};

export default EntryInfo;
