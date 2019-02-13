import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import contestData from "./test-data/contests";
import userData from "./test-data/users";

ReactDOM.render(
    <App
        testData={contestData}
        userData={userData}
        contestData={contestData}
    />,
    document.getElementById("root")
);
