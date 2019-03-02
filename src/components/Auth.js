import React from "react";
import AuthYes from "./AuthYes";
import AuthNo from "./AuthNo";
import PropTypes from "prop-types";

class Auth extends React.Component {
    state = {
        authenticated: true
    };

    checkAuth = () => {
        const { onAvatarClick } = this.props;
        return this.state.authenticated ? (
            <AuthYes
                user={this.props.userData}
                currentUser={this.props.currentUser}
                onAvatarClick={onAvatarClick}
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
    userData: PropTypes.object,
    currentUser: PropTypes.number,
    onAvatarClick: PropTypes.func
};

export default Auth;
