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

    today = new Date().toISOString();

    handleEntrySubmit = (contest, entryText) => {
        // Construct the new entry and call the api
        api.addEntry(
            contest._id,
            entryText,
            0,
            this.state.currentUser,
            this.today
        )
            .then(resp => {
                // Make a copy of the contest data
                const updatedContestData = { ...this.state.contestData };
                // Get the contest to modify
                const contestToEdit = updatedContestData[contest._id];
                // Spread the new entry into the existing entries of that contest
                contestToEdit.entries = [...contestToEdit.entries, resp];
            })
            .catch(console.error);

        // TO DO: get the app to use the entries data from the entries collection
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

    updateUserLikes = (user, entry) => {
        api.updateUserLikes(user, entry);
        // Make a copy of the user data
        const userDataCopy = { ...this.state.allUsers };
        // Add the new entry to user's likesReceived array
        userDataCopy[user].likesReceived.push(entry);

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
            entriesData,
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
                    entriesData={entriesData}
                    userData={allUsers}
                    currentUser={currentUser}
                    contestsFollowing={contestsFollowing}
                    handleEntrySubmit={this.handleEntrySubmit}
                    handleEntryEditSave={this.handleEntryEditSave}
                    onAvatarClick={this.fetchProfile}
                    onMoreClick={this.fetchContest}
                    singleContestId={singleContestId}
                    updateUserLikes={this.updateUserLikes}
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
