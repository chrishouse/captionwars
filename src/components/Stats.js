import React from "react";
import PropTypes from "prop-types";

class Stats extends React.Component {
    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        const { userData, currentUser } = this.props;

        return (
            <section className="sidebar-stats">
                <div className="user-stat stat-likes-received">
                    <span>Likes received</span>
                    <span>
                        {/* Using the array index here only works while the userId matches the index, which won't be the case once we're using a database */}
                        {this.numberWithCommas(
                            userData[currentUser].likesReceived.length
                        )}
                    </span>
                </div>
                <div className="user-stat stat-winning">
                    <span>Current winning entries</span>
                    <span>
                        {this.numberWithCommas(
                            userData[currentUser].currentWinningEntries.length
                        )}
                    </span>
                </div>
                <div className="user-stat">
                    <span>Likes given</span>
                    <span>
                        {this.numberWithCommas(
                            userData[currentUser].likesGiven.length
                        )}
                    </span>
                </div>
                <div className="user-stat">
                    <span>Contests entered</span>
                    <span>
                        {this.numberWithCommas(
                            userData[currentUser].contestsEntered.length
                        )}
                    </span>
                </div>
                <div className="user-stat">
                    <span>Contests following</span>
                    <span>
                        {this.numberWithCommas(
                            userData[currentUser].contestsFollowing.length
                        )}
                    </span>
                </div>
            </section>
        );
    }
}

Stats.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string
};

export default Stats;
