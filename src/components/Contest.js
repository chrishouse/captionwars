import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

class Contest extends React.Component {
    state = {
        entriesOrder: "ranking" // Can be "ranking" or "newest"
    };

    handleSubmit = () => {
        // ... do stuff here ...
    };

    render() {
        const { contestData, onLikeClick } = this.props;
        return (
            <section className="contest">
                <div className="contest-date">{contestData.date}</div>

                <img
                    className="contest-photo"
                    src={`/images/contests/${contestData.contestId}.jpg`}
                />

                {/* to do: first sort the entries by likes */}
                <Entry
                    entryNumber={1}
                    entry={contestData.entries[0]}
                    onLikeClick={onLikeClick}
                    contest={contestData}
                    isWinner
                />

                <EntrySorter />

                {contestData.entries.map((entry, index) => {
                    if (index > 0) {
                        return (
                            <Entry
                                key={entry.entryId}
                                entryNumber={index + 1}
                                entry={entry}
                                onLikeClick={onLikeClick}
                                contest={contestData}
                            />
                        );
                    }
                })}
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
