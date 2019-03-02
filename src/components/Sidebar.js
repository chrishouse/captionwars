import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

const Sidebar = ({ userData, currentUser }) => {
    return (
        <aside className="sidebar">
            <header className="sidebar-header">
                <img
                    className="sidebar-photo"
                    src={`/images/users/${currentUser}.jpg`}
                />
                <p className="sidebar-username">
                    {/* This only works while the userId matches the index, which won't be the case once we're using a database */}
                    {userData[currentUser].userName}
                </p>
            </header>
            <Stats userData={userData} currentUser={currentUser} />
            <Leaderboard />
        </aside>
    );
};

Sidebar.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.number
};

export default Sidebar;
