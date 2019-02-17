import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

class Contest extends React.Component {
    state = {
        entryRadioChecked: "entry-newest-first" // Can be "entry-ranking" or "entry-newest-first"
    };

    handleSubmit = () => {
        // TO DO: Handle submit
    };

    handleEntryRadioChange = radio => {
        this.setState({
            entryRadioChecked: radio
        });
    };

    render() {
        const { contestData, onLikeClick } = this.props;
        const { entryRadioChecked } = this.state;

        // TO DO: make sure the winner doesn't change even though the sorting changes
        if (entryRadioChecked === "entry-ranking") {
            // Sort the entries by likes
            contestData.entries.sort((a, b) => {
                if (a.likes <= b.likes) {
                    return 1;
                } else {
                    return -1;
                }
            });
        } else {
            // TO DO: Sort the entries by date
        }

        // Make a clone of the (newly sorted) array to modify
        const entries = Array.from(contestData.entries);

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

                <EntrySorter
                    entryRadioChecked={entryRadioChecked}
                    onEntryRadioChange={this.handleEntryRadioChange}
                    contestId={contestData.contestId}
                />

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
