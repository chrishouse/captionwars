import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import PropTypes from "prop-types";
import contestData from "../test-data/contests";
import userData from "../test-data/users";

class App extends React.Component {
    state = {
        contestData: contestData,
        userData: userData
    };

    render() {
        return (
            <div className="app">
                <Header userData={this.state.userData} />
                <article className="main-container inner">
                    <Sidebar userData={this.state.userData} />
                    <Main contestData={this.state.contestData} />
                </article>
            </div>
        );
    }
}

App.propTypes = {
    userData: PropTypes.array,
    contestData: PropTypes.array
};

export default App;
