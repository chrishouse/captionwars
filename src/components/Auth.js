import React from "react";
import AuthYes from "./AuthYes";
import AuthNo from "./AuthNo";
import PropTypes from "prop-types";

class Auth extends React.Component {
    state = {
        authenticated: true
    };
    render() {
        return (
            <section className="header-auth">
                {this.state.authenticated ? (
                    <AuthYes userData={this.props.userData} />
                ) : (
                    <AuthNo />
                )}
            </section>
        );
    }
}

Auth.propTypes = {
    userData: PropTypes.array
};

export default Auth;
