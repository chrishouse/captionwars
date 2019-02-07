import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

class App extends React.Component {
    state = {};

    render() {
        return (
            <div className="app">
                <Header />
                <Sidebar />
                <Main />
            </div>
        );
    }
}

export default App;
