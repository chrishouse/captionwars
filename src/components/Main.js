import React from "react";
import ContestSorter from "./ContestSorter";
import Contest from "./Contest";
import PropTypes from "prop-types";

class Main extends React.Component {
    state = {
        radioChecked: "newest-first",
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

        return (
            <main className="main">
                <ContestSorter
                    radioChecked={radioChecked}
                    following={following}
                    onFollowingChange={this.handleFollowingCheck}
                    onRadioChange={this.handleRadioChange}
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
