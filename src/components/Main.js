import React from "react";
import ContestSorter from "./ContestSorter";
import Contest from "./Contest";
import PropTypes from "prop-types";

class Main extends React.Component {
    render() {
        return (
            <main className="main">
                <ContestSorter />
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
