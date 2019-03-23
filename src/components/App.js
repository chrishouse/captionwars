import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Profile from "./Profile";
import PropTypes from "prop-types";
import * as api from "../api";

const pushState = (obj, url) => {
    window.history.pushState(obj, "", url);
};

// Handle the browser's back/forward buttons
const onPopState = handler => {
    window.onpopstate = handler;
};

class App extends React.Component {
    state = {
        contestData: this.props.initialContests.contests,
        entriesData: this.props.initialEntries.entries,
        allUsers: this.props.initialUsers.allUsers,
        currentUser: "5c7ecf9eb8a7020d42fb850b",
        contestsFollowing: [1, 4],
        profileId: this.props.initialUsers.profileId,
        singleContestId: this.props.initialContests.singleContestId,
        entriesSortedBy: "entry-newest-first" // Can be "entry-ranking" or "entry-newest-first"
    };

    componentDidMount() {
        // Handle the browser's back/forward buttons
        onPopState(e => {
            this.setState({
                profileId: (e.state || {}).profileId,
                singleContestId: (e.state || {}).singleContestId
            });
        });
    }

    componentWillUnmount() {
        onPopState(null);
    }

    today = new Date().toISOString();

    updateUserLikes = (userReceiving, entry, likes, remove) => {
        // Make a copy of the user data
        const userDataCopy = { ...this.state.allUsers };

        if (remove) {
            // Remove the entry from receiving user's likesReceived array
            userDataCopy[userReceiving].likesReceived = userDataCopy[
                userReceiving
            ].likesReceived.filter(item => entry != item);
            // Remove the new entry from the giving user's likesGiven array
            userDataCopy[this.state.currentUser].likesGiven = userDataCopy[
                this.state.currentUser
            ].likesGiven.filter(item => entry != item);
        } else {
            // Add the new entry to receiving user's likesReceived array
            userDataCopy[userReceiving].likesReceived.push(entry);
            // Add the new entry to the giving user's likesGiven array
            userDataCopy[this.state.currentUser].likesGiven.push(entry);
        }

        this.setState({
            allUsers: userDataCopy
        });

        // Update the db
        api.updateUserLikes(
            userReceiving,
            this.state.currentUser,
            entry,
            likes
        );
    };

    updateContestsEntered = (userId, contestId, remove) => {
        api.updateContestsEntered(userId, contestId, remove);

        // Make a copy of the user data
        const userDataCopy = { ...this.state.allUsers };

        if (remove) {
            // Remove the contest from user's contestsEntered array
            userDataCopy[userId].contestsEntered = userDataCopy[
                userId
            ].contestsEntered.filter(item => contestId != item);
        } else {
            // Add the new contest to the user's contestsEntered array
            userDataCopy[userId].contestsEntered.push(contestId);
        }

        this.setState({
            allUsers: userDataCopy
        });
    };

    // Set the profileId state to the id of the avatar clicked, change the url, and fetch that user's info from the api
    fetchProfile = userId => {
        pushState({ profileId: userId }, `/profile/${userId}`);

        api.fetchUser(userId).then(user => {
            this.setState({
                profileId: user._id,
                userData: {
                    ...this.state.allUsers, // This part is just for a performance boost, since the componemt can read the data directly from state
                    [user._id]: user
                }
            });
        });
    };

    // Set the singleContestId state to the id of the contest whose More button was clicked, and change the url
    fetchContest = (singleContestId, entriesSortedBy) => {
        if (singleContestId) {
            pushState(
                { singleContestId: singleContestId },
                `/contest/${singleContestId}`
            );
        } else {
            pushState({ singleContestId: undefined }, `/`);
        }

        this.setState({
            singleContestId: singleContestId,
            entriesSortedBy: entriesSortedBy
                ? entriesSortedBy
                : "entry-newest-first"
        });
    };

    currentContent() {
        const {
            allUsers,
            entriesData,
            currentUser,
            contestData,
            contestsFollowing,
            profileId,
            singleContestId,
            entriesSortedBy
        } = this.state;

        // If profileId is set it means a user avatar was clicked and we want to display Profile
        if (profileId) {
            return <Profile profileId={profileId} userData={allUsers} />;
        }
        // Otherwise display the home page
        return (
            <article className="main-container inner">
                <Sidebar userData={allUsers} currentUser={currentUser} />
                <Main
                    contestData={contestData}
                    entriesData={entriesData}
                    userData={allUsers}
                    currentUser={currentUser}
                    contestsFollowing={contestsFollowing}
                    onAvatarClick={this.fetchProfile}
                    onMoreClick={this.fetchContest}
                    singleContestId={singleContestId}
                    entriesSortedBy={entriesSortedBy}
                    updateUserLikes={this.updateUserLikes}
                    updateContestsEntered={this.updateContestsEntered}
                    updateCurrentWinningEntries={
                        this.updateCurrentWinningEntries
                    }
                />
            </article>
        );
    }

    render() {
        const { allUsers, currentUser } = this.state;

        return (
            <div className="app">
                <Header
                    userData={allUsers}
                    currentUser={currentUser}
                    onAvatarClick={this.fetchProfile}
                />
                {this.currentContent()}
            </div>
        );
    }
}

App.propTypes = {
    allUsers: PropTypes.object,
    contestData: PropTypes.object,
    initialContests: PropTypes.object,
    initialEntries: PropTypes.object,
    initialUsers: PropTypes.object,
    singleContestId: PropTypes.string
};

export default App;
