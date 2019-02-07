import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import data from "./test-data/data";

ReactDOM.render(<App testData={data} />, document.getElementById("root"));
