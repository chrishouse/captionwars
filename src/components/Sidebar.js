import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

const Sidebar = props => {
    return (
        <aside className="sidebar">
            <img src={`/images/${props.userData[0].id}.jpg`} />
            {props.userData[0].userName}
            <Stats userData={props.userData} />
            <Leaderboard />
        </aside>
    );
};

Sidebar.propTypes = {
    userData: PropTypes.array
};

export default Sidebar;
