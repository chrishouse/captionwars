import React from "react";
import PropTypes from "prop-types";

class UserAvatar extends React.Component {
    state = {
        currentUser: 0
    };

    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        const { currentUser } = this.state;
        const { user, likesReceived, currentWinners } = this.props;

        return (
            <div className="user-avatar">
                <img
                    className="user-avatar-image"
                    src={`/images/users/${user}.jpg`}
                    alt="name goes here"
                />
                <div
                    className={
                        "user-number" + (currentUser === user ? " you" : "")
                    }
                >
                    {this.numberWithCommas(likesReceived)}
                </div>
                {currentWinners > 0 ? (
                    <div className="user-winners">{currentWinners}</div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

UserAvatar.propTypes = {
    user: PropTypes.number,
    likesReceived: PropTypes.number,
    isYou: PropTypes.bool,
    currentWinners: PropTypes.number
};

export default UserAvatar;
