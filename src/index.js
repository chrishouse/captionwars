import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import contestData from "./test-data/data";
import userData from "./test-data/user";

ReactDOM.render(
    <App testData={contestData} userData={userData} />,
    document.getElementById("root")
);
