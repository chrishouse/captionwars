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
        currentUser: "5c7ecf9eb8a7020d42fb850a",
        contestsFollowing: [1, 4],
        profileId: this.props.initialUsers.profileId,
        singleContestId: this.props.initialContests.singleContestId
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

    handleLikeClick = (contest, entry) => {
        // TO DO: completely redo this function to utilize the database

        // Get the index of tne entry before converting
        let entryIndex = this.state.contestData[contest._id].entries.indexOf(
            entry
        );
        // Clone the contestData object to modify
        let contestData = JSON.parse(JSON.stringify(this.state.contestData));
        // Make a clone of the contest object
        contestData[contest._id] = { ...contest };
        // Make a clone of the entry object
        contestData[contest._id].entries[entryIndex] = { ...entry };
        // Incremement the likes
        contestData[contest._id].entries[entryIndex].likes++;
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
                profileId: user._id,
                userData: {
                    ...this.state.allUsers, // This part is just for a performance boost, since the componemt can read the data directly from state
                    [user._id]: user
                }
            });
        });
    };

    // Set the singleContestId state to the id of the contest whose More button was clicked, and change the url
    fetchContest = singleContestId => {
        if (singleContestId) {
            pushState(
                { singleContestId: singleContestId },
                `/contest/${singleContestId}`
            );
        } else {
            pushState({ singleContestId: undefined }, `/`);
        }

        this.setState({
            singleContestId: singleContestId
        });
    };

    currentContent() {
        const {
            allUsers,
            currentUser,
            contestData,
            contestsFollowing,
            profileId,
            singleContestId
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
                    userData={allUsers}
                    onLikeClick={this.handleLikeClick}
                    currentUser={currentUser}
                    contestsFollowing={contestsFollowing}
                    handleEntrySubmit={this.handleEntrySubmit}
                    handleEntryEditSave={this.handleEntryEditSave}
                    onAvatarClick={this.fetchProfile}
                    onMoreClick={this.fetchContest}
                    singleContestId={singleContestId}
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
    singleContestId: PropTypes.string
};

export default App;
