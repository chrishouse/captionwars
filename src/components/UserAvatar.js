import React from "react";
import PropTypes from "prop-types";

class UserAvatar extends React.Component {
    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    handleAvatarClick = () => {
        this.props.onAvatarClick(this.props.user);
    };

    render() {
        const { user, currentUser, likesReceived } = this.props;

        return (
            <div className="user-avatar" onClick={this.handleAvatarClick}>
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
                    {this.numberWithCommas(likesReceived.length)}
                </div>
            </div>
        );
    }
}

UserAvatar.propTypes = {
    user: PropTypes.string.isRequired,
    likesReceived: PropTypes.array.isRequired,
    isYou: PropTypes.bool,
    currentWinners: PropTypes.number,
    currentUser: PropTypes.string.isRequired,
    onAvatarClick: PropTypes.func.isRequired
};

export default UserAvatar;
