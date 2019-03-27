import React from "react";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";
import * as api from "../api";

class Contest extends React.Component {
    state = {
        entriesSortedBy: this.props.entriesSortedBy,
        expanded: this.props.expanded,
        contestEntries: this.props.entriesData,
        userHasEntered: false,
        confirmMessage: false,
        userIsFollowing: false,
        entriesDisplayed: 9
    };
    // Our class-scoped variable that will hold a copy of the entries object
    entries;

    today = new Date().toISOString();

    handleEntrySubmit = (contest, entryText) => {
        // Construct the new entry and call the api
        api.addEntry(
            contest._id,
            entryText,
            0,
            this.props.currentUser,
            this.today
        )
            .then(() => {
                api.fetchEntries(contest._id).then(newEntries => {
                    this.setState(() => ({
                        contestEntries: newEntries
                    }));
                });
            })
            .catch(console.error);

        // Add the contest to the user's contestsEntered array
        this.props.updateContestsEntered(
            this.props.currentUser,
            contest._id,
            false
        );

        // Show the confirmation message, and then hide it 8 seconds later
        this.setState({
            entriesSortedBy: "entry-newest-first",
            userHasEntered: true,
            confirmMessage: true
            // currentWinner: newWinner
        });

        setTimeout(() => {
            this.setState({
                confirmMessage: false
            });
        }, 8000);

        // Scroll to the top of the contest
        const contestEl = document.getElementById(this.props.contestData._id);
        contestEl.scrollIntoView();
    };

    getUpdatedEntries() {
        api.fetchEntries(this.props.contestData._id).then(entries => {
            this.setState({
                contestEntries: entries
            });
        });
    }

    handleEntryEditSave = (entry, newText) => {
        api.updateEntryText(entry, newText, this.props.currentUser).then(
            this.getUpdatedEntries()
        );
    };

    componentDidMount() {
        this.getUpdatedEntries();

        // Check if current user has entered this contest, set state accordingly
        const currentUsersContests = this.props.userData[this.props.currentUser]
            .contestsEntered;

        if (currentUsersContests.includes(this.props.contestData._id)) {
            this.setState({
                userHasEntered: true
            });
        }

        // Check if current user is following the contest, set state accordingly
        const currentUserFollowing = this.props.userData[this.props.currentUser]
            .contestsFollowing;

        if (currentUserFollowing.includes(this.props.contestData._id)) {
            this.setState({
                userIsFollowing: true
            });
        }

        if (this.state.expanded) {
            document.addEventListener("scroll", this.handleScroll);
            window.scrollTo(0, 0);
        }
    }

    // Lazyloading functionality
    handleScroll = this.props.scrollDebounce(
        e => {
            const el = e.srcElement.body;
            const triggerPoint = el.clientHeight + el.clientHeight;
            const bottom = el.scrollHeight - el.scrollTop <= triggerPoint;
            if (bottom) {
                this.setState(prevState => ({
                    entriesDisplayed: prevState.entriesDisplayed + 5
                }));
            }
        },
        250,
        false
    );

    // Return the rank (by likes) of an entry regardless of sorting order. If tied return the earliest date.
    getRank = entry => {
        const rankEntries = Array.from(this.entries);
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

    // Locate the winner (the one with the most likes)
    getWinner = remove => {
        // Get the highest likes value
        const maxLikes = this.entries.reduce((a, b) => {
            return b.likes > a ? b.likes : a;
        }, 0);

        // Then get the object(s) with that value and put it/them into an array
        let maxObj = this.entries.filter(entry => {
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

        if (remove === true) {
            // Remove the winner from the entries array
            this.entries.splice(this.entries.indexOf(maxObj), 1);
        }

        // Return the winner
        return maxObj;
    };

    getSliceArgs = () => {
        let sliceArgs = [];
        if (this.state.expanded) {
            sliceArgs = [0, this.state.entriesDisplayed];
        } else {
            sliceArgs = [0, 4];
        }
        return sliceArgs;
    };

    handleLikeClick = (entry, remove) => {
        // Call the api
        this.props.updateUserLikes(
            entry.user,
            entry._id,
            this.state.contestEntries[entry._id].likes,
            remove
        );

        // Make a copy of the entries data
        const contestEntriesCopy = { ...this.state.contestEntries };

        remove
            ? contestEntriesCopy[entry._id].likes--
            : contestEntriesCopy[entry._id].likes++;

        this.setState({
            contestEntries: contestEntriesCopy
        });
    };

    handleEntryRadioChange = radio => {
        this.setState({
            entriesSortedBy: radio
        });
    };

    handleMoreClick = close => {
        if (close === true) {
            this.props.onMoreClick();
        } else {
            this.props.onMoreClick(
                this.props.contestData._id,
                this.state.entriesSortedBy
            );
        }
    };

    handleDeleteImSure = entryId => {
        api.deleteEntry(entryId, this.props.currentUser).then(() => {
            this.getUpdatedEntries();

            // Delete the contest from the user's contestsEntered array
            this.props.updateContestsEntered(
                this.props.currentUser,
                this.props.contestData._id,
                true
            );

            this.setState({
                userHasEntered: false
            });
        });
    };

    handleFollowingBtnClick = () => {
        api.updateContestsFollowing(
            this.props.currentUser,
            this.props.contestData._id,
            this.state.userIsFollowing
        );

        // This function sets the state for contest sorting
        this.props.handleFollowingBtnClick(
            this.props.contestData._id,
            this.state.userIsFollowing
        );

        this.setState(prevState => {
            return {
                userIsFollowing: !prevState.userIsFollowing
            };
        });
    };

    render() {
        const {
            contestData,
            userData,
            currentUser,
            onAvatarClick,
            singleContestId
        } = this.props;
        const {
            entriesSortedBy,
            userHasEntered,
            confirmMessage,
            userIsFollowing
        } = this.state;

        // Reset the entries variable to a copy of state.contestEntries
        this.entries = Object.values(this.state.contestEntries);

        // Sort the entries either by likes or date, depending on which radio is checked
        switch (this.state.entriesSortedBy) {
            case "entry-ranking":
                this.entries.sort((a, b) => {
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
                this.entries.sort((a, b) => {
                    if (a.date <= b.date) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                break;
        }

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
                    id={contestData._id}
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
                        src={`/images/contests/${contestData._id}.jpg`}
                    />

                    {this.entries.length > 0 ? (
                        <Entry
                            entryNumber={1}
                            userData={userData}
                            currentUser={currentUser}
                            entry={this.getWinner(true)}
                            onLikeClick={this.handleLikeClick}
                            contest={contestData}
                            isWinner
                            entryText={""}
                            handleEntryEditSave={this.handleEntryEditSave}
                            onAvatarClick={onAvatarClick}
                            handleDeleteImSure={this.handleDeleteImSure}
                        />
                    ) : null}
                    {this.entries.length > 0 ? (
                        <EntrySorter
                            entriesSortedBy={entriesSortedBy}
                            onEntryRadioChange={this.handleEntryRadioChange}
                            singleContestId={contestData._id}
                        />
                    ) : null}
                    {this.entries.length > 0
                        ? this.entries
                              .slice(...this.getSliceArgs())
                              .map(entry => (
                                  <Entry
                                      key={entry._id}
                                      entryNumber={this.getRank(entry) + 2}
                                      userData={userData}
                                      currentUser={currentUser}
                                      entry={entry}
                                      onLikeClick={this.handleLikeClick}
                                      contest={contestData}
                                      handleEntryEditSave={
                                          this.handleEntryEditSave
                                      }
                                      onAvatarClick={onAvatarClick}
                                      handleDeleteImSure={
                                          this.handleDeleteImSure
                                      }
                                  />
                              ))
                        : null}

                    <div className="more-entries-btn-cont">
                        {this.entries.length > 4 && !singleContestId ? (
                            <React.Fragment>
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
                            </React.Fragment>
                        ) : null}
                    </div>

                    <div
                        className={
                            "follow-btn" + (userIsFollowing ? " following" : "")
                        }
                        onClick={this.handleFollowingBtnClick}
                    >
                        <span>
                            {userIsFollowing ? "Following" : "Follow Contest"}
                        </span>
                        <i className="far fa-arrow-alt-circle-left" />
                    </div>

                    <EntryInput
                        handleSubmit={this.handleEntrySubmit}
                        contestData={contestData}
                        entryText={""}
                        userHasEntered={userHasEntered}
                    />

                    <div
                        className={
                            "confirm-message" +
                            (confirmMessage ? " visible" : "")
                        }
                    >
                        Thanks for your entry. Good luck!
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

Contest.propTypes = {
    contestData: PropTypes.object,
    entriesData: PropTypes.object,
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    handleEntrySubmit: PropTypes.func,
    handleEntryEditSave: PropTypes.func,
    onAvatarClick: PropTypes.func,
    onMoreClick: PropTypes.func,
    singleContestId: PropTypes.string,
    entriesSortedBy: PropTypes.string,
    expanded: PropTypes.bool,
    updateUserLikes: PropTypes.func,
    updateContestsEntered: PropTypes.func,
    updateCurrentWinningEntries: PropTypes.func,
    handleFollowingBtnClick: PropTypes.func,
    scrollDebounce: PropTypes.func
};

export default Contest;
