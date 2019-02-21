import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import PropTypes from "prop-types";
import contestData from "../test-data/contests";
import userData from "../test-data/users";

class App extends React.Component {
    state = {
        contestData: contestData,
        userData: userData,
        currentUser: 0,
        contestsFollowing: userData[0].contestsFollowing
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

    handleEntrySubmit = (contest, entryText) => {
        const today = new Date().toISOString();
        // Construct the new entry (this is temporary until we get the database in place)
        const newEntry = {
            entryId: 134,
            text: entryText,
            likes: 0,
            user: this.state.currentUser,
            date: today
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

    render() {
        const {
            userData,
            contestData,
            currentUser,
            contestsFollowing
        } = this.state;

        return (
            <div className="app">
                <Header userData={userData} currentUser={currentUser} />
                <article className="main-container inner">
                    <Sidebar userData={userData} currentUser={currentUser} />
                    <Main
                        contestData={contestData}
                        onLikeClick={this.handleLikeClick}
                        currentUser={currentUser}
                        contestsFollowing={contestsFollowing}
                        handleEntrySubmit={this.handleEntrySubmit}
                    />
                </article>
            </div>
        );
    }
}

App.propTypes = {
    userData: PropTypes.array,
    contestData: PropTypes.array
};

export default App;
