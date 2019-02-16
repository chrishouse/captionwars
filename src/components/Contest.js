import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

class Contest extends React.Component {
    state = {
        entriesOrder: "date" // Can be "likes" or "date"
    };

    // sortedEntries =

    handleSubmit = () => {
        // ... do stuff here ...
    };

    render() {
        const { contestData, onLikeClick } = this.props;

        // Make a clone of the array to modify
        const entries = [...contestData.entries];

        if (this.state.entriesOrder === "likes") {
            // Sort the entries by likes
            entries.sort((a, b) => b.likes - a.likes);
        } else {
            // Sort the entries by date
            // To do
        }

        return (
            <section className="contest">
                <div className="contest-date">{contestData.date}</div>
                <img
                    className="contest-photo"
                    src={`/images/contests/${contestData.contestId}.jpg`}
                />

                <Entry
                    entryNumber={1}
                    entry={entries.shift()}
                    onLikeClick={onLikeClick}
                    contest={contestData}
                    isWinner
                />

                <EntrySorter />

                {entries.map((entry, index) => (
                    <Entry
                        key={entry.entryId}
                        entryNumber={index + 2}
                        entry={entry}
                        onLikeClick={onLikeClick}
                        contest={contestData}
                    />
                ))}

                <div className="more-entries-btn-cont">
                    <button className="more-entries-btn button">
                        More entries
                    </button>
                    <i
                        className={"fas fa-chevron-down"}
                        onClick={this.handleSubmit}
                    />
                </div>
                <div className="follow-btn">
                    <i className="far fa-arrow-alt-circle-right" />
                    <span> Follow contest</span>
                </div>
                <EntryInput />
            </section>
        );
    }
}

Contest.propTypes = {
    contestData: PropTypes.object
};

export default Contest;
