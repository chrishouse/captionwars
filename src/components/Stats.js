import React from "react";
import PropTypes from "prop-types";

class Stats extends React.Component {
    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        return (
            <section className="sidebar-stats">
                <div className="user-stat stat-likes-received">
                    Likes Received
                    {this.numberWithCommas(
                        this.props.userData[0].likesReceived
                    )}
                </div>
                <div className="user-stat stat-winning">
                    Current winning entries
                    {this.numberWithCommas(
                        this.props.userData[0].currentWinningEntries
                    )}
                </div>
                <div className="user-stat">
                    Likes given{" "}
                    {this.numberWithCommas(this.props.userData[0].likesGiven)}
                </div>
                <div className="user-stat">
                    Contests entered{" "}
                    {this.numberWithCommas(
                        this.props.userData[0].contestsEntered
                    )}
                </div>
                <div className="user-stat">
                    Contests following{" "}
                    {this.numberWithCommas(
                        this.props.userData[0].contestsFollowing
                    )}
                </div>
            </section>
        );
    }
}

Stats.propTypes = {
    userData: PropTypes.array
};

export default Stats;
