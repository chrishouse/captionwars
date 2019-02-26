import React from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import PropTypes from "prop-types";

class App extends React.Component {
    state = {
        contestData: this.props.initialContests,
        userData: this.props.initialUsers,
        currentUser: 2,
        contestsFollowing: [1, 4],
        dataLoaded: false
    };

    componentDidMount() {
        // Make an AJAX call to our API endpoints using Axios, and set the state to the data
        axios
            .all([axios.get("/api/contests"), axios.get("/api/users")])
            .then(resp => {
                this.setState({
                    contestData: resp[0].data.contests,
                    userData: resp[1].data.users,
                    currentUser: 2,
                    contestsFollowing: resp[1].data.users[2].contestsFollowing,
                    dataLoaded: true
                });
            })
            .catch(console.error);
    }

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

    showApp() {
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
                        handleEntryEditSave={this.handleEntryEditSave}
                    />
                </article>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.state.dataLoaded ? this.showApp() : <div>Loading...</div>}
            </React.Fragment>
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
