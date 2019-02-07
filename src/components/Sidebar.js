import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <Stats />
            <Leaderboard />
        </aside>
    );
};

export default Sidebar;
