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

    render() {
        const { radioChecked, following } = this.state;
        const {
            contestData,
            onLikeClick,
            currentUser,
            contestsFollowing,
            handleEntrySubmit,
            handleEntryEditSave
        } = this.props;

        // Make a clone of the contests array to modify
        let contests = Array.from(contestData);

        // Sort the contests either by newest, oldest or popularity, depending on which radio is checked
        const sortDate = order => {
            contests.sort((a, b) => {
                if (order === "newest" ? a.date < b.date : a.date > b.date) {
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
        if (following) {
            contests = contests.filter(contest => {
                return contestsFollowing.indexOf(contest.contestId) !== -1;
            });
        }

        return (
            <main className="main">
                <ContestSorter
                    radioChecked={radioChecked}
                    following={following}
                    onFollowingChange={this.handleFollowingCheck}
                    onRadioChange={this.handleRadioChange}
                />
                {contests.map(contest => {
                    return (
                        <Contest
                            key={contest.contestId}
                            contestData={contest}
                            currentUser={currentUser}
                            onLikeClick={onLikeClick}
                            handleEntrySubmit={handleEntrySubmit}
                            handleEntryEditSave={handleEntryEditSave}
                        />
                    );
                })}
            </main>
        );
    }
}

Main.propTypes = {
    contestData: PropTypes.array,
    onLikeClick: PropTypes.func,
    currentUser: PropTypes.number,
    contestsFollowing: PropTypes.array,
    handleEntrySubmit: PropTypes.func,
    handleEntryEditSave: PropTypes.func
};

export default Main;
