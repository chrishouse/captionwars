import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

const Contest = props => {
    const { contestData } = props;

    return (
        <section className="contest">
            <div className="contest-date">{contestData.date}</div>

            <img
                className="contest-photo"
                src={`/images/contests/${contestData.contestId}.jpg`}
            />

            {/* to do: first sort the entries by likes */}
            <Entry entryNumber={1} entry={contestData.entries[0]} isWinner />

            <EntrySorter />

            {contestData.entries.map((entry, index) => {
                if (index > 0) {
                    return (
                        <Entry
                            key={entry.entryId}
                            entryNumber={index + 1}
                            entry={entry}
                        />
                    );
                }
            })}

            <button className="more-entries-btn">More entries</button>
            <button className="follow-btn">Follow contest</button>

            <EntryInput />
        </section>
    );
};

Contest.propTypes = {
    contestData: PropTypes.object
};

export default Contest;
