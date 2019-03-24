import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "./UserAvatar";

const Leaderboard = ({ userData, currentUser, onAvatarClick }) => {
    // Make an array copy of the userData object, then sort it by likesReceived
    const users = Object.values(userData).sort((a, b) => {
        if (a.likesReceived.length < b.likesReceived.length) {
            return 1;
        } else {
            return -1;
        }
    });

    return (
        <aside className="sidebar-section">
            <header className="sidebar-header">
                <p className="sidebar-leaderboard-text">
                    Caption Wars Leaderboard
                </p>
            </header>
            <section className="sidebar-leaderboard">
                <div className="leaderboard-heading">
                    <span>
                        <i className="far fa-thumbs-up" />
                        &nbsp;&nbsp;Most likes received
                    </span>
                </div>
                <section className="leaderboard">
                    {users.slice(0, 10).map((user, index) => {
                        return (
                            <div key={user._id} className="leaderboard-item">
                                <div className="leaderboard-count">
                                    <span>{index + 1}</span>
                                </div>
                                <div className="leaderboard-item-user">
                                    <p
                                        className="leaderboard-username"
                                        onClick={() => onAvatarClick(user._id)}
                                    >
                                        {user.userName}
                                    </p>
                                    <UserAvatar
                                        user={user._id}
                                        currentUser={currentUser}
                                        likesReceived={user.likesReceived}
                                        onAvatarClick={onAvatarClick}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </section>
            </section>
        </aside>
    );
};

Leaderboard.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func
};

export default Leaderboard;
