import React from "react";
import PropTypes from "prop-types";

const EntrySorter = ({
    entriesSortedBy,
    onEntryRadioChange,
    singleContestId
}) => {
    const handleEntryRadioChange = e => {
        onEntryRadioChange(e.target.id);
    };

    return (
        <div className="entry-sorter">
            <div className="entry-sort-radios">
                <p>Sort entries by:</p>
                <input
                    type="radio"
                    id="entry-newest-first"
                    name={`entry-sort-radios-${singleContestId}`}
                    onChange={handleEntryRadioChange}
                    checked={
                        entriesSortedBy === "entry-newest-first" ? true : false
                    }
                />
                <label htmlFor={`entry-newest-first-${singleContestId}`}>
                    Newest first
                </label>
                <input
                    type="radio"
                    id="entry-ranking"
                    name={`entry-sort-radios-${singleContestId}`}
                    onChange={handleEntryRadioChange}
                    checked={entriesSortedBy === "entry-ranking" ? true : false}
                />
                <label htmlFor={`entry-ranking-${singleContestId}`}>
                    Ranking
                </label>
            </div>
        </div>
    );
};

EntrySorter.propTypes = {
    entriesSortedBy: PropTypes.string,
    onEntryRadioChange: PropTypes.func,
    singleContestId: PropTypes.string
};

export default EntrySorter;
