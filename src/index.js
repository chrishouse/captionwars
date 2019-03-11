import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(
    // React is rendering in-sync with the server render
    <App
        initialContests={window.initialContestData}
        initialEntries={window.initialEntriesData}
        initialUsers={window.initialUserData}
    />,
    document.getElementById("root")
);
