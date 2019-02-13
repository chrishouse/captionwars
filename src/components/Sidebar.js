import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

const Sidebar = props => {
    return (
        <aside className="sidebar">
            <header className="sidebar-header">
                <img
                    className="sidebar-photo"
                    src={`/images/users/${props.userData[0].userId}.jpg`}
                />
                <p className="sidebar-username">{props.userData[0].userName}</p>
            </header>
            <Stats userData={props.userData} />
            <Leaderboard />
        </aside>
    );
};

Sidebar.propTypes = {
    userData: PropTypes.array
};

export default Sidebar;
