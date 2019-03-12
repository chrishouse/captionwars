import React from "react";
import ContestSorter from "./ContestSorter";
import Contest from "./Contest";
import PropTypes from "prop-types";

class Main extends React.Component {
    state = {
        radioChecked: "newest-first", // Can be "newest-first", "oldest-first" or "popular-first"
        following: false
    };

    handleFollowingCheck = () => {
        this.setState({
            following: !this.state.following
        });
    };

    handleRadioChange = radio => {
        this.setState({
            radioChecked: radio
        });
    };

    displayContests(id) {
        const { radioChecked, following } = this.state;
        const {
            contestData,
            entriesData,
            userData,
            currentUser,
            contestsFollowing,
            handleEntrySubmit,
            handleEntryEditSave,
            onAvatarClick,
            onMoreClick,
            singleContestId
        } = this.props;

        if (id) {
            let contest = this.props.contestData[id];

            return (
                <Contest
                    contestData={contest}
                    entriesData={entriesData}
                    userData={userData}
                    currentUser={this.props.currentUser}
                    handleEntrySubmit={this.props.handleEntrySubmit}
                    handleEntryEditSave={this.props.handleEntryEditSave}
                    onAvatarClick={this.props.onAvatarClick}
                    onMoreClick={this.props.onMoreClick}
                    singleContestId={singleContestId}
                    expanded={true}
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
                // TO DO: Sort by popularity
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
            // TO DO make this work with the database. It's currently broken because it's using indexOf
            if (following) {
                contests = contests.filter(contest => {
                    return contestsFollowing.indexOf(contest._id) !== -1;
                });
            }

            return (
                <React.Fragment>
                    <ContestSorter
                        radioChecked={this.state.radioChecked}
                        following={this.state.following}
                        onFollowingChange={this.handleFollowingCheck}
                        onRadioChange={this.handleRadioChange}
                    />
                    {contests.map(contest => {
                        return (
                            <Contest
                                key={contest._id}
                                contestData={contest}
                                entriesData={entriesData}
                                userData={userData}
                                currentUser={currentUser}
                                handleEntrySubmit={handleEntrySubmit}
                                handleEntryEditSave={handleEntryEditSave}
                                onAvatarClick={onAvatarClick}
                                onMoreClick={onMoreClick}
                                singleContestId={singleContestId}
                                expanded={false}
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
    handleEntryEditSave: PropTypes.func,
    onAvatarClick: PropTypes.func,
    onMoreClick: PropTypes.func,
    singleContestId: PropTypes.string
};

export default Main;
