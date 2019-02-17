import React from "react";

const EntrySorter = ({ entryRadioChecked, onEntryRadioChange, contestId }) => {
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
                    name={`entry-sort-radios-${contestId}`}
                    onChange={handleEntryRadioChange}
                    checked={
                        entryRadioChecked === "entry-newest-first"
                            ? true
                            : false
                    }
                />
                <label htmlFor={`entry-newest-first-${contestId}`}>
                    Newest first
                </label>
                <input
                    type="radio"
                    id="entry-ranking"
                    name={`entry-sort-radios-${contestId}`}
                    onChange={handleEntryRadioChange}
                    checked={
                        entryRadioChecked === "entry-ranking" ? true : false
                    }
                />
                <label htmlFor={`entry-ranking-${contestId}`}>Ranking</label>
            </div>
        </div>
    );
};

export default EntrySorter;
