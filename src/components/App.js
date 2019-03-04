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
        allUsers: this.props.initialUsers.allUsers,
        currentUser: 2,
        contestsFollowing: [1, 4],
        profileId: this.props.initialUsers.profileId,
        contestId: this.props.initialContests.contestId
    };

    componentDidMount() {
        // Handle the browser's back/forward buttons
        onPopState(e => {
            this.setState({
                profileId: (e.state || {}).profileId,
                contestId: (e.state || {}).contestId
            });
        });
    }

    componentWillUnmount() {
        onPopState(null);
    }

    handleLikeClick = (contest, entry) => {
        // Make a clone of contestData to manipulate inside this function
        let contestData = Object.values(this.state.contestData);
        // Get the array index of the contest passed in
        let contestIndex = contestData.indexOf(contest);
        // Get the array index of the entry passed in
        let entryIndex = contestData[contestIndex].entries.indexOf(entry);
        // Make a clone of the contest object
        contestData[contestIndex] = { ...contest };
        // Make a clone of the entry object
        contestData[contestIndex].entries[entryIndex] = { ...entry };
        // Incremement the likes
        contestData[contestIndex].entries[entryIndex].likes++;
        // Set the state of the real contestData to match our cloned contestData
        this.setState({ contestData });
    };

    today = new Date().toISOString();

    handleEntrySubmit = (contest, entryText) => {
        // Construct the new entry (this is temporary until we get the database in place)
        const newEntry = {
            entryId: 134,
            text: entryText,
            likes: 0,
            user: this.state.currentUser,
            date: this.today
        };

        // Make a copy of the contest data
        const updatedContestData = [...this.state.contestData];
        // Get the index of the contest to modify
        const index = this.state.contestData.indexOf(contest);
        // Spread the new entry into the existing entries
        updatedContestData[index].entries = [
            ...updatedContestData[index].entries,
            newEntry
        ];

        this.setState({
            contestData: updatedContestData
        });
    };

    handleEntryEditSave = (contest, entry, newText) => {
        // Construct the edited entry (this is temporary until we get the database in place)
        const editedEntry = {
            entryId: entry.entryId,
            text: newText,
            likes: 0,
            user: this.state.currentUser,
            date: this.today
        };

        // Make a copy of the contest data
        const updatedContestData = [...this.state.contestData];
        // Get the index of the contest to modify
        const contestIndex = this.state.contestData.indexOf(contest);
        // Get the index of the edited entry
        const entryIndex = this.state.contestData[contestIndex].entries.indexOf(
            entry
        );
        // Spread the edited entry into the existing entry
        updatedContestData[contestIndex].entries[entryIndex] = editedEntry;

        this.setState({
            contestData: updatedContestData
        });
    };

    // Set the profileId state to the id of the avatar clicked, change the url, and fetch that user's info from the api
    fetchProfile = userId => {
        pushState({ profileId: userId }, `/profile/${userId}`);

        api.fetchUser(userId).then(user => {
            this.setState({
                profileId: user.userId,
                userData: {
                    ...this.state.allUsers, // This part is just for a performance boost, since the componemt can read the data directly from state
                    [user.userId]: user
                }
            });
        });
    };

    // Set the contestId state to the id of the contest whose More button was clicked, and change the url
    fetchContest = contestId => {
        contestId === -1
            ? pushState({ contestId: -1 }, `/`)
            : pushState({ contestId: contestId }, `/contest/${contestId}`);

        this.setState({
            contestId: contestId
        });
    };

    currentContent() {
        const {
            allUsers,
            currentUser,
            contestData,
            contestsFollowing,
            profileId,
            contestId
        } = this.state;

        // If profileId is set it means a user avatar was clicked and we want to display Profile
        if (profileId > -1) {
            return <Profile profileId={profileId} userData={allUsers} />;
        }
        // Otherwise display the home page
        return (
            <article className="main-container inner">
                <Sidebar userData={allUsers} currentUser={currentUser} />
                <Main
                    contestData={contestData}
                    onLikeClick={this.handleLikeClick}
                    currentUser={currentUser}
                    contestsFollowing={contestsFollowing}
                    handleEntrySubmit={this.handleEntrySubmit}
                    handleEntryEditSave={this.handleEntryEditSave}
                    onAvatarClick={this.fetchProfile}
                    onMoreClick={this.fetchContest}
                    contestId={contestId}
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
    initialUsers: PropTypes.object,
    contestId: PropTypes.number
};

export default App;
