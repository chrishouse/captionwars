import React from "react";
import ContestSorter from "./ContestSorter";
import Contest from "./Contest";
import PropTypes from "prop-types";

class Main extends React.Component {
    state = {
        radioChecked: "newest-first", // Can be "newest-first", "oldest-first" or "popular-first"
        followingFilter: false,
        contestsDisplayed: 5
    };

    componentDidMount = () => {
        // Add our eventListener for lazyload
        document.addEventListener("scroll", this.handleScroll);
    };

    // Our debounce function (courtesy of David Walsh at https://davidwalsh.name/javascript-debounce-function)
    scrollDebounce = (func, wait, immediate) => {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Lazyloading functionality
    handleScroll = this.scrollDebounce(
        e => {
            const el = e.srcElement.body;
            const triggerPoint = el.clientHeight + el.clientHeight * 3;
            const bottom = el.scrollHeight - el.scrollTop <= triggerPoint;
            if (bottom) {
                this.setState(prevState => ({
                    contestsDisplayed: prevState.contestsDisplayed + 5
                }));
            }
        },
        250,
        false
    );

    handleFollowingCheck = () => {
        this.setState(prevState => ({
            followingFilter: !prevState.followingFilter
        }));
    };

    handleRadioChange = radio => {
        this.setState({
            radioChecked: radio
        });
    };

    getUniqueEntries = contest => {
        // First create and array from the object so that it can be filtered
        let contestEntries = Object.values(this.props.entriesData);
        // Then filter it
        contestEntries = contestEntries.filter(entry => {
            return entry.contestId === contest._id;
        });
        // Now convert it back to an object
        let arrayToObject = (array, keyField) =>
            array.reduce((obj, item) => {
                obj[item[keyField]] = item;
                return obj;
            }, {});
        return arrayToObject(contestEntries, "_id");
    };

    displayContests(id) {
        const { radioChecked, followingFilter, contestsDisplayed } = this.state;
        const {
            contestData,
            entriesData,
            userData,
            currentUser,
            onAvatarClick,
            onMoreClick,
            singleContestId,
            updateUserLikes,
            updateContestsEntered,
            updateCurrentWinningEntries,
            entriesSortedBy,
            handleFollowingBtnClick,
            isAuthenticated
        } = this.props;

        if (id) {
            let contest = this.props.contestData[id];

            return (
                <Contest
                    contestData={contest}
                    entriesData={this.getUniqueEntries(contest)}
                    userData={userData}
                    currentUser={this.props.currentUser}
                    handleEntrySubmit={this.props.handleEntrySubmit}
                    onAvatarClick={this.props.onAvatarClick}
                    onMoreClick={this.props.onMoreClick}
                    singleContestId={singleContestId}
                    entriesSortedBy={entriesSortedBy}
                    expanded={true}
                    updateUserLikes={updateUserLikes}
                    updateContestsEntered={updateContestsEntered}
                    updateCurrentWinningEntries={updateCurrentWinningEntries}
                    handleFollowingBtnClick={handleFollowingBtnClick}
                    handleScroll={this.handleScroll}
                    scrollDebounce={this.scrollDebounce}
                    isAuthenticated={isAuthenticated}
                />
            );
        } else {
            // Make an array clone of the contests object to modify
            let contests = Object.values(contestData);

            // Sort the contests either by newest, oldest or popularity, depending on which radio is checked
            const sortDate = order => {
                contests.sort((a, b) => {
                    if (
                        order === "newest" ? a.date < b.date : a.date > b.date
                    ) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            };

            const sortPopular = () => {
                // Make an array clone of the entries object
                const entries = Object.values(entriesData);
                contests.sort((a, b) => {
                    // Filter through the entries array to get the number of entries for each contest. Sort accordingly.
                    const aEntries = entries.filter(entry => {
                        return entry.contestId === a._id;
                    });
                    const bEntries = entries.filter(entry => {
                        return entry.contestId === b._id;
                    });
                    if (aEntries < bEntries) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            };

            switch (radioChecked) {
                case "newest-first":
                    sortDate("newest");
                    break;
                case "oldest-first":
                    sortDate("oldest");
                    break;
                case "popular-first":
                    sortPopular();
                    break;
            }

            // Show only followed contests if the Following checkbox is checked
            if (followingFilter) {
                const contestsUserIsFollowing =
                    userData[currentUser].contestsFollowing;
                contests = contests.filter(contest => {
                    return contestsUserIsFollowing.includes(contest._id);
                });
            }

            return (
                <React.Fragment>
                    <ContestSorter
                        radioChecked={this.state.radioChecked}
                        followingFilter={this.state.followingFilter}
                        onFollowingChange={this.handleFollowingCheck}
                        onRadioChange={this.handleRadioChange}
                        isAuthenticated={isAuthenticated}
                    />
                    {/* // For each contest, grab ONLY the entries for that contest */}
                    {contests.slice(0, contestsDisplayed).map(contest => {
                        return (
                            <Contest
                                key={contest._id}
                                contestData={contest}
                                entriesData={this.getUniqueEntries(contest)}
                                userData={userData}
                                currentUser={currentUser}
                                onAvatarClick={onAvatarClick}
                                onMoreClick={onMoreClick}
                                singleContestId={singleContestId}
                                entriesSortedBy={entriesSortedBy}
                                expanded={false}
                                updateUserLikes={updateUserLikes}
                                updateContestsEntered={updateContestsEntered}
                                updateCurrentWinningEntries={
                                    updateCurrentWinningEntries
                                }
                                handleFollowingBtnClick={
                                    handleFollowingBtnClick
                                }
                                scrollDebounce={this.scrollDebounce}
                                isAuthenticated={isAuthenticated}
                            />
                        );
                    })}
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <main className="main">
                {this.displayContests(this.props.singleContestId)}
            </main>
        );
    }
}

Main.propTypes = {
    contestData: PropTypes.object,
    entriesData: PropTypes.object,
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    contestsFollowing: PropTypes.array,
    handleEntrySubmit: PropTypes.func,
    onAvatarClick: PropTypes.func,
    onMoreClick: PropTypes.func,
    singleContestId: PropTypes.string,
    entriesSortedBy: PropTypes.string,
    updateUserLikes: PropTypes.func,
    updateContestsEntered: PropTypes.func,
    updateCurrentWinningEntries: PropTypes.func,
    handleFollowingBtnClick: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default Main;
