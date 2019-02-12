import React from "react";

class UserAvatar extends React.Component {
    state = {
        isYou: true
    };

    render() {
        return (
            <div className="user-avatar">
                <img
                    className="user-avatar-image"
                    src="/images/chrishouse.jpg"
                    alt="name goes here"
                />
                <div
                    className={"user-number" + (this.state.isYou ? " you" : "")}
                >
                    1,234
                </div>
            </div>
        );
    }
}

export default UserAvatar;
