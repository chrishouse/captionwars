import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import PropTypes from "prop-types";

class App extends React.Component {
    state = {};

    render() {
        return (
            <div className="app">
                <Header userData={this.props.userData} />
                <article className="main-container inner">
                    <Sidebar userData={this.props.userData} />
                    <Main />
                </article>
            </div>
        );
    }
}

App.propTypes = {
    userData: PropTypes.array
};

export default App;
