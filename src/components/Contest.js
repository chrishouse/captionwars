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
        const { contestData, onLikeClick, currentUser } = this.props;
        const { entryRadioChecked } = this.state;

        // Make a clone of the entries array to modify
        const entries = Array.from(contestData.entries);

        // Sort the entries either by likes or date, depending on which radio is checked
        entries.sort((a, b) => {
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

        // Return the rank (by likes) of an entry regardless of sorting order
        const getRank = entry => {
            const rankEntries = Array.from(entries);
            rankEntries.sort((a, b) => {
                if (a.likes <= b.likes) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return rankEntries.indexOf(entry);
        };

        // Locate the winner (the one with the most likes) and separate it from the entries array
        const winner = () => {
            // Get the highest likes value
            const maxLikes = entries.reduce((a, b) => {
                return b.likes > a ? b.likes : a;
            }, 0);

            // Then get the object(s) with that value and put it/them into an array
            let maxObj = entries.filter(entry => {
                return entry.likes === maxLikes;
            });

            // If likes are tied (i.e. the maxObj array contains more than 1 item), the winner is the entry with the earliest date
            if (maxObj.length > 1) {
                // 1. Convert the items to millisecond format for easy comparison
                const dateArr = maxObj.map(entry =>
                    new Date(entry.date).getTime()
                );
                // 2. Grab the lowest one
                let earliestDate = Math.min(...dateArr);
                // 3. Find the item in the maxObj array whose date matches earlestDate
                const singleDateObj = maxObj.filter(entry => {
                    // Convert both date values back to ISO format to match what's in the data
                    const entryDate = new Date(entry.date).toISOString();
                    earliestDate = new Date(earliestDate).toISOString();
                    // Return the single object
                    return entryDate === earliestDate;
                });

                maxObj = singleDateObj;
            }

            // maxObj is an array (with a single object), but we need it to be just an object
            maxObj = maxObj[0];

            // Remove the winner from the entries array
            entries.splice(entries.indexOf(maxObj), 1);

            // Return the winner
            return maxObj;
        };

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
                    currentUser={currentUser}
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

                {entries.map(entry => (
                    <Entry
                        key={entry.entryId}
                        entryNumber={getRank(entry) + 2}
                        currentUser={currentUser}
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
