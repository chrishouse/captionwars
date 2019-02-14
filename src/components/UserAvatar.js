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
        return (
            <div className="user-avatar">
                <img
                    className="user-avatar-image"
                    src={`/images/users/${this.props.user}.jpg`}
                    alt="name goes here"
                />
                <div
                    className={
                        "user-number" +
                        (this.state.currentUser === this.props.user
                            ? " you"
                            : "")
                    }
                >
                    {this.numberWithCommas(this.props.likesReceived)}
                </div>
                {this.props.currentWinners > 0 ? (
                    <div className="user-winners">
                        {this.props.currentWinners}
                    </div>
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
