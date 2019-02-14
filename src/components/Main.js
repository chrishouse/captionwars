import React from "react";
import ContestSorter from "./ContestSorter";
import Contest from "./Contest";
import PropTypes from "prop-types";

class Main extends React.Component {
    state = {
        radioChecked: "newest-first",
        following: false
    };

    followingToggle = () => {
        this.setState({
            following: !this.state.following
        });
    };

    radioChange = radio => {
        this.setState({
            radioChecked: radio
        });
    };

    render() {
        return (
            <main className="main">
                <ContestSorter
                    radioChecked={this.state.radioChecked}
                    following={this.state.following}
                    onFollowingChange={this.followingToggle}
                    onRadioChange={this.radioChange}
                />
                {this.props.contestData.map(contest => {
                    return (
                        <Contest
                            key={contest.contestId}
                            contestData={contest}
                        />
                    );
                })}
            </main>
        );
    }
}

Main.propTypes = {
    contestData: PropTypes.array
};

export default Main;
