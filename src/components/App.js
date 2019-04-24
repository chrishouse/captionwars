import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Account from "./Account";
import Register from "./Register";
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
        currentUser: null,
        profileId: this.props.initialUsers.profileId,
        singleContestId: this.props.initialContests.singleContestId,
        entriesSortedBy: "entry-newest-first", // Can be "entry-ranking" or "entry-newest-first"
        accountPage: this.props.accountPage,
        isAuthenticated: false,
        checkingAuth: true,
        register: false,
        loginErrorMessage: null
    };

    // Grab the id from the token payload (this function courtesy of Stackoverflow)
    parseJwt = token => {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64)).id;
    };

    componentDidMount() {
        // Handle the browser's back/forward buttons
        onPopState(e => {
            this.setState({
                profileId: (e.state || {}).profileId,
                singleContestId: (e.state || {}).singleContestId,
                accountPage: (e.state || {}).accountPage
            });
        });

        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");

            this.setState({
                currentUser: this.parseJwt(token),
                isAuthenticated: true
            });
        }

        // Set the og:image to the selected contest image
        if (this.state.singleContestId) {
            document
                .querySelector('meta[property="og:image"]')
                .setAttribute(
                    "content",
                    `https://captionwars.com/images/contests${
                        this.state.singleContestId
                    }.jpg`
                );
        }

        this.setState({
            checkingAuth: false
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
            ].likesReceived.filter(
                item => item.fromUser !== this.state.currentUser
            );
            // Remove the new entry from the giving user's likesGiven array
            userDataCopy[this.state.currentUser].likesGiven = userDataCopy[
                this.state.currentUser
            ].likesGiven.filter(
                item => item.fromUser !== this.state.currentUser
            );
        } else {
            // Add the new entry to receiving user's likesReceived array
            userDataCopy[userReceiving].likesReceived.push({
                forEntry: entry,
                fromUser: this.state.currentUser
            });
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

    handleFollowingBtnClick = (contestId, remove) => {
        // Make a copy of the user data
        const userDataCopy = { ...this.state.allUsers };

        const userId = this.state.currentUser;

        if (remove) {
            // Remove the contest from user's contestsFollowing array
            userDataCopy[userId].contestsFollowing = userDataCopy[
                userId
            ].contestsFollowing.filter(item => contestId != item);
        } else {
            // Add the contest to the user's contestsFollowing array
            userDataCopy[userId].contestsFollowing.push(contestId);
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
                accountPage: false,
                userData: {
                    ...this.state.allUsers, // This part is just for a performance boost, since the componemt can read the data directly from state
                    [user._id]: user
                }
            });
        });
    };

    handleAccountClick = () => {
        pushState({ accountPage: true }, "/account");

        this.setState({
            accountPage: true,
            profileId: ""
        });
    };

    handleHomeClick = () => {
        pushState({ homePage: true }, "/");
        this.setState({
            profileId: "",
            singleContestId: "",
            accountPage: false
        });
    };

    // Set the singleContestId state to the id of the contest whose More button was clicked, and change the url
    fetchContest = (singleContestId, entriesSortedBy) => {
        if (singleContestId) {
            // Set the og:image to the selected contest image
            document
                .querySelector('meta[property="og:image"]')
                .setAttribute(
                    "content",
                    `https://captionwars.com/images/contests${singleContestId}.jpg`
                );
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

    handleLoginClick = (e, inputUsername, inputPassword) => {
        e.preventDefault();
        api.login(inputUsername, inputPassword).then(resp => {
            if (resp.status !== 200) {
                this.setState({
                    loginErrorMessage: resp.data.msg
                });
            } else if (resp.status === 200) {
                this.setState({
                    isAuthenticated: true,
                    currentUser: resp.data.user.id,
                    loginErrorMessage: null
                });
            }
        });
    };

    handleLogoutClick = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        this.setState({
            isAuthenticated: false,
            currentUser: null
        });
    };

    handleRegisterClick = () => {
        this.setState({
            singleContestId: null,
            register: true,
            loginErrorMessage: null
        });
    };

    handleRegisterSuccess = () => {
        // Get updated users data to pass to the components (we get errors if this isn't done because the new user isn't in the allUsers state yet)
        api.fetchAllUsers().then(users => {
            this.setState({
                allUsers: users
            });
            const token = localStorage.getItem("token");

            this.setState({
                register: false,
                isAuthenticated: true,
                currentUser: this.parseJwt(token)
            });
        });
    };

    handleRegisterCancel = () => {
        this.setState({
            register: false
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
            entriesSortedBy,
            isAuthenticated,
            accountPage
        } = this.state;

        // If profileId is set it means a user avatar was clicked and we want to display Profile
        if (profileId) {
            return (
                <Profile
                    profileId={profileId}
                    userData={allUsers}
                    currentUser={currentUser}
                    onAvatarClick={this.fetchProfile}
                    isAuthenticated={isAuthenticated}
                    onHomeClick={this.handleHomeClick}
                />
            );
            // If accountPage is true we want to display Account
        } else if (accountPage) {
            if (isAuthenticated) {
                return (
                    <Account
                        userData={allUsers}
                        onAvatarClick={this.fetchProfile}
                        isAuthenticated={true}
                        onHomeClick={this.handleHomeClick}
                    />
                );
                // If the user is not authenticated, send them to the home page
            } else {
                pushState({ homePage: true }, "/");
            }
        }

        // Otherwise display the home page
        return (
            <article className="main-container inner">
                <Sidebar
                    userData={allUsers}
                    currentUser={currentUser}
                    onAvatarClick={this.fetchProfile}
                    isAuthenticated={isAuthenticated}
                />
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
                    handleFollowingBtnClick={this.handleFollowingBtnClick}
                    isAuthenticated={isAuthenticated}
                />
            </article>
        );
    }

    render() {
        const {
            allUsers,
            currentUser,
            isAuthenticated,
            checkingAuth,
            register,
            loginErrorMessage
        } = this.state;

        if (!checkingAuth) {
            return (
                <div className="app">
                    <Header
                        userData={allUsers}
                        currentUser={currentUser}
                        onAvatarClick={this.fetchProfile}
                        onAccountClick={this.handleAccountClick}
                        onLoginClick={this.handleLoginClick}
                        isAuthenticated={isAuthenticated}
                        onHomeClick={this.handleHomeClick}
                        onLogoutClick={this.handleLogoutClick}
                        onRegisterClick={this.handleRegisterClick}
                        loginErrorMessage={loginErrorMessage}
                    />
                    {/* // Show the register modal */}
                    {register ? (
                        <Register
                            handleRegisterSuccess={this.handleRegisterSuccess}
                            onCancelClick={this.handleRegisterCancel}
                        />
                    ) : null}
                    {this.currentContent()}
                </div>
            );
        } else return null;
    }
}

App.propTypes = {
    allUsers: PropTypes.object,
    contestData: PropTypes.object,
    initialContests: PropTypes.object,
    initialEntries: PropTypes.object,
    initialUsers: PropTypes.object,
    singleContestId: PropTypes.string,
    accountPage: PropTypes.bool
};

export default App;
