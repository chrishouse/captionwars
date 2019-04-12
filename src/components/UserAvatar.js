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
        const { user, currentUser, likesReceived, avatar } = this.props;

        return (
            <div className="user-avatar" onClick={this.handleAvatarClick}>
                <img
                    className="user-avatar-image"
                    src={`/images/users/${avatar}`}
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
    user: PropTypes.string,
    likesReceived: PropTypes.array,
    isYou: PropTypes.bool,
    currentWinners: PropTypes.number,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    avatar: PropTypes.string
};

export default UserAvatar;
