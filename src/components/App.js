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
        contestsFollowing: [0, 1, 5]
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
                    <Sidebar userData={userData} />
                    <Main
                        contestData={contestData}
                        onLikeClick={this.handleLikeClick}
                        currentUser={currentUser}
                        contestsFollowing={contestsFollowing}
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
