import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import PropTypes from "prop-types";

const pushState = (obj, url) => {
    window.history.pushState(obj, "", url);
};

class App extends React.Component {
    state = {
        contestData: this.props.initialContests,
        userData: this.props.initialUsers,
        currentUser: 1,
        contestsFollowing: [1, 4]
    };

    handleLikeClick = (contest, entry) => {
        // Make a clone of contestData to manipulate inside this function
        let contestData = [...this.state.contestData];
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

    fetchProfile = userId => {
        pushState({}, `/profile/${userId}`);
    };

    render() {
        const {
            userData,
            currentUser,
            contestData,
            contestsFollowing
        } = this.state;

        return (
            <div className="app">
                <Header
                    userData={userData}
                    currentUser={currentUser}
                    onAvatarClick={this.fetchProfile}
                />
                <article className="main-container inner">
                    <Sidebar userData={userData} currentUser={currentUser} />
                    <Main
                        contestData={contestData}
                        onLikeClick={this.handleLikeClick}
                        currentUser={currentUser}
                        contestsFollowing={contestsFollowing}
                        handleEntrySubmit={this.handleEntrySubmit}
                        handleEntryEditSave={this.handleEntryEditSave}
                        onAvatarClick={this.fetchProfile}
                    />
                </article>
            </div>
        );
    }
}

App.propTypes = {
    userData: PropTypes.array,
    contestData: PropTypes.array,
    initialContests: PropTypes.array,
    initialUsers: PropTypes.array
};

export default App;
