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
                <article className="main-container inner">
                    <Sidebar />
                    <Main />
                </article>
            </div>
        );
    }
}

export default App;
