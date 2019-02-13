import React from "react";
import PropTypes from "prop-types";

class UserAvatar extends React.Component {
    state = {
        isYou: true
    };

    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        return (
            <div className="user-avatar">
                <img
                    className="user-avatar-image"
                    src={`/images/users/${this.props.userData[0].userId}.jpg`}
                    alt="name goes here"
                />
                <div
                    className={"user-number" + (this.state.isYou ? " you" : "")}
                >
                    {this.numberWithCommas(
                        this.props.userData[0].likesReceived
                    )}
                </div>
            </div>
        );
    }
}

UserAvatar.propTypes = {
    userData: PropTypes.array
};

export default UserAvatar;
