import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

const Sidebar = ({ userData, currentUser, onAvatarClick }) => {
    return (
        <aside className="sidebar">
            <Stats userData={userData} currentUser={currentUser} />
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
    onAvatarClick: PropTypes.func
};

export default Sidebar;
