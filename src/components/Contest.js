import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

const Contest = props => {
    return (
        <section className="contest">
            <div className="contest-date">{props.contestData.date}</div>
            <section className="contest-photo">
                <img
                    src={`/images/contests/${props.contestData.contestId}.jpg`}
                />
            </section>

            {props.contestData.entries.map(entry => {
                return <Entry key={entry.entryId} entry={entry} />;
            })}

            <EntrySorter />
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
