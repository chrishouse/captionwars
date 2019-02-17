import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

const Sidebar = ({ userData }) => {
    return (
        <aside className="sidebar">
            <header className="sidebar-header">
                <img
                    className="sidebar-photo"
                    src={`/images/users/${userData[0].userId}.jpg`}
                />
                <p className="sidebar-username">{userData[0].userName}</p>
            </header>
            <Stats userData={userData} />
            <Leaderboard />
        </aside>
    );
};

Sidebar.propTypes = {
    userData: PropTypes.array
};

export default Sidebar;
