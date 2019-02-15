import React from "react";
import PropTypes from "prop-types";

class Stats extends React.Component {
    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        const { userData } = this.props;

        return (
            <section className="sidebar-stats">
                <div className="user-stat stat-likes-received">
                    <span>Likes received</span>
                    <span>
                        {this.numberWithCommas(userData[0].likesReceived)}
                    </span>
                </div>
                <div className="user-stat stat-winning">
                    <span>Current winning entries</span>
                    <span>
                        {this.numberWithCommas(
                            userData[0].currentWinningEntries
                        )}
                    </span>
                </div>
                <div className="user-stat">
                    <span>Likes given</span>
                    <span>{this.numberWithCommas(userData[0].likesGiven)}</span>
                </div>
                <div className="user-stat">
                    <span>Contests entered</span>
                    <span>
                        {this.numberWithCommas(userData[0].contestsEntered)}
                    </span>
                </div>
                <div className="user-stat">
                    <span>Contests following</span>
                    <span>
                        {this.numberWithCommas(userData[0].contestsFollowing)}
                    </span>
                </div>
            </section>
        );
    }
}

Stats.propTypes = {
    userData: PropTypes.array
};

export default Stats;
