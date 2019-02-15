import React from "react";

const EntryInput = () => {
    return (
        <div className="entry-input">
            <textarea placeholder="Your entry..." />
            <button className="button" type="submit">
                Submit
            </button>
        </div>
    );
};

export default EntryInput;
