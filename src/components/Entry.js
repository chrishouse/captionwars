import React from "react";
import PropTypes from "prop-types";

const Entry = props => {
    return (
        <div>
            {props.contestEntry.map(entry => {
                return (
                    <div className="entry" key={entry.entryId}>
                        <p>{entry.text}</p>
                        <p>{entry.date}</p>
                        <section className="entry-info">
                            <p>User ID: {entry.user}</p>
                            <p>Likes: {entry.likes}</p>
                        </section>
                    </div>
                );
            })}
        </div>
    );
};

Entry.propTypes = {
    contestEntry: PropTypes.array
};

export default Entry;
