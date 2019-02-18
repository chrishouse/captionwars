import React from "react";
import AuthYes from "./AuthYes";
import AuthNo from "./AuthNo";
import PropTypes from "prop-types";

class Auth extends React.Component {
    state = {
        authenticated: true
    };

    checkAuth = () => {
        return this.state.authenticated ? (
            <AuthYes
                user={this.props.userData}
                currentUser={this.props.currentUser}
            />
        ) : (
            <AuthNo />
        );
    };

    render() {
        return <section className="header-auth">{this.checkAuth()}</section>;
    }
}

Auth.propTypes = {
    userData: PropTypes.array
};

export default Auth;
