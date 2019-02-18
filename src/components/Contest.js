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

        // Sort the entries either by likes or date, depending on which radio is checked
        contestData.entries.sort((a, b) => {
            if (
                entryRadioChecked === "entry-ranking"
                    ? a.likes <= b.likes
                    : a.date <= b.date
            ) {
                return 1;
            } else {
                return -1;
            }
        });

        // Make a clone of the (newly sorted) array to modify
        const entries = Array.from(contestData.entries);

        // Grab the item with the highest number of likes (this is the winner)
        // TO DO: Account for a tie in likes on page load
        const winner = () => {
            // Get the highest likes value
            const maxLikes = contestData.entries.reduce(function(a, b) {
                return b.likes > a ? b.likes : a;
            }, 0);
            // Then get the object with that value and return it
            const maxObj = contestData.entries.find(function(o) {
                return o.likes == maxLikes;
            });
            return maxObj;
        };

        // Remove the winner from the entries array (since it will always show up independently at the top)
        if (entryRadioChecked === "entry-ranking") {
            entries.shift();
        } else {
            let winnerToDrop = entries.indexOf(winner());
            entries.splice(winnerToDrop, 1);
        }

        return (
            <section className="contest">
                <div className="contest-date">
                    {new Date(contestData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </div>
                <img
                    className="contest-photo"
                    src={`/images/contests/${contestData.contestId}.jpg`}
                />

                <Entry
                    entryNumber={1}
                    entry={winner()}
                    onLikeClick={onLikeClick}
                    contest={contestData}
                    isWinner
                />

                <EntrySorter
                    entryRadioChecked={entryRadioChecked}
                    onEntryRadioChange={this.handleEntryRadioChange}
                    contestId={contestData.contestId}
                />

                {/* TO DO: Get the entryNumber to be the rank (i.e. the index when sorted by likes) regardless of the sorting option */}
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
