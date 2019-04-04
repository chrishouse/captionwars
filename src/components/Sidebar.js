import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

const Sidebar = ({ userData, currentUser, onAvatarClick, isAuthenticated }) => {
    return (
        <aside className="sidebar">
            {isAuthenticated ? (
                <Stats userData={userData} currentUser={currentUser} />
            ) : null}
            <Leaderboard
                userData={userData}
                currentUser={currentUser}
                onAvatarClick={onAvatarClick}
            />
        </aside>
    );
};

Sidebar.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default Sidebar;
