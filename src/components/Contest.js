import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

class Contest extends React.Component {
    state = {
        entriesSortedBy: "entry-newest-first", // Can be "entry-ranking" or "entry-newest-first"
        expanded: this.props.expanded
    };

    handleEntryRadioChange = radio => {
        this.setState({
            entriesSortedBy: radio
        });
    };

    handleEntrySubmit = () => {
        this.setState({
            entriesSortedBy: "entry-newest-first"
        });
    };

    handleMoreClick = close => {
        if (close === true) {
            this.props.onMoreClick(-1);
        } else {
            this.props.onMoreClick(this.props.contestData.contestId);
        }
    };

    render() {
        const {
            contestData,
            userData,
            onLikeClick,
            currentUser,
            handleEntrySubmit,
            handleEntryEditSave,
            onAvatarClick
        } = this.props;
        const { entriesSortedBy } = this.state;

        // Make a clone of the entries array to modify
        const entries = Array.from(contestData.entries);

        // Sort the entries either by likes or date, depending on which radio is checked
        switch (entriesSortedBy) {
            case "entry-ranking":
                entries.sort((a, b) => {
                    if (a.likes < b.likes) {
                        return 1;
                    } else if (a.likes > b.likes) {
                        return -1;
                        // If likes are tied, the entry with the oldest date is returned
                    } else if (a.likes === b.likes) {
                        if (a.date > b.date) {
                            return 1;
                        } else if (a.date < b.date) {
                            return -1;
                        }
                    }
                });
                break;
            case "entry-newest-first":
                entries.sort((a, b) => {
                    if (a.date <= b.date) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                break;
        }

        // Return the rank (by likes) of an entry regardless of sorting order. If tied return the earliest date.
        const getRank = entry => {
            const rankEntries = Array.from(entries);
            rankEntries.sort((a, b) => {
                if (a.likes < b.likes) {
                    return 1;
                } else if (a.likes > b.likes) {
                    return -1;
                } else if (a.likes === b.likes) {
                    if (a.date > b.date) {
                        return 1;
                    } else if (a.date < b.date) {
                        return -1;
                    }
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
                maxObj.sort((a, b) => {
                    if (a.date > b.date) {
                        return 1;
                    } else if (a.date < b.date) {
                        return -1;
                    }
                });
            }

            // maxObj is an array, so get the first item
            // (if the length of maxObj had been 1 there would only be one item in the array, but we still need to grab it.)
            maxObj = maxObj[0];

            // Remove the winner from the entries array
            entries.splice(entries.indexOf(maxObj), 1);

            // Return the winner
            return maxObj;
        };

        const getSliceArgs = () => {
            let sliceArgs = [];
            if (this.state.expanded) {
                sliceArgs = [0];
            } else {
                sliceArgs = [0, 4];
            }
            return sliceArgs;
        };

        return (
            <React.Fragment>
                <div
                    className={
                        "hidden-contest-overlay" +
                        (this.state.expanded ? "" : " hidden")
                    }
                    onClick={() => {
                        this.handleMoreClick(true);
                    }}
                />
                <section
                    className={
                        "contest" +
                        (this.state.expanded ? " contest-expanded" : "")
                    }
                >
                    <i
                        className={
                            "far fa-times-circle" +
                            (this.state.expanded ? "" : " hidden")
                        }
                        onClick={() => {
                            this.handleMoreClick(true);
                        }}
                    />
                    <div className="contest-date">
                        {new Date(contestData.date).toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        )}
                    </div>
                    <img
                        className="contest-photo"
                        src={`/images/contests/${contestData.contestId}.jpg`}
                    />

                    <Entry
                        entryNumber={1}
                        userData={userData}
                        currentUser={currentUser}
                        entry={winner()}
                        onLikeClick={onLikeClick}
                        contest={contestData}
                        isWinner
                        entryText={""}
                        handleEntryEditSave={handleEntryEditSave}
                        onAvatarClick={onAvatarClick}
                    />

                    <EntrySorter
                        entriesSortedBy={entriesSortedBy}
                        onEntryRadioChange={this.handleEntryRadioChange}
                        contestId={contestData.contestId}
                    />

                    {entries.slice(...getSliceArgs()).map(entry => (
                        <Entry
                            key={entry.entryId}
                            entryNumber={getRank(entry) + 2}
                            userData={userData}
                            currentUser={currentUser}
                            entry={entry}
                            onLikeClick={onLikeClick}
                            contest={contestData}
                            handleEntryEditSave={handleEntryEditSave}
                            onAvatarClick={onAvatarClick}
                        />
                    ))}

                    <div className="more-entries-btn-cont">
                        <button
                            className="more-entries-btn button"
                            onClick={this.handleMoreClick}
                        >
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

                    <EntryInput
                        handleSubmit={handleEntrySubmit}
                        contestData={contestData}
                        entryText={""}
                        onEntrySubmit={this.handleEntrySubmit}
                    />
                </section>
            </React.Fragment>
        );
    }
}

Contest.propTypes = {
    contestData: PropTypes.object,
    userData: PropTypes.object,
    onLikeClick: PropTypes.func,
    currentUser: PropTypes.number,
    handleEntrySubmit: PropTypes.func,
    handleEntryEditSave: PropTypes.func,
    onAvatarClick: PropTypes.func,
    onMoreClick: PropTypes.func,
    contestId: PropTypes.number,
    expanded: PropTypes.bool
};

export default Contest;
