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
            </div>
        );
    }
}

UserAvatar.propTypes = {
    user: PropTypes.number,
    likesReceived: PropTypes.number,
    isYou: PropTypes.bool
};

export default UserAvatar;
