import React from "react";
import PropTypes from "prop-types";

class Stats extends React.Component {
    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        const { userData, currentUser } = this.props;

        return (
            <aside className="sidebar-section">
                <header className="sidebar-header">
                    <img
                        className="sidebar-photo"
                        src={`/images/users/${userData[currentUser].avatar}`}
                    />
                    <p className="sidebar-username">
                        {userData[currentUser].userName}
                    </p>
                </header>
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
            </aside>
        );
    }
}

Stats.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string
};

export default Stats;
