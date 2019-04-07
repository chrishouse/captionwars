import React from "react";
import AuthYes from "./AuthYes";
import AuthNo from "./AuthNo";
import PropTypes from "prop-types";

class Auth extends React.Component {
    checkAuth = () => {
        const {
            userData,
            currentUser,
            onAvatarClick,
            onAccountClick,
            onLoginClick,
            onLogoutClick,
            onRegisterClick,
            loginErrorMessage
        } = this.props;
        return this.props.isAuthenticated ? (
            <AuthYes
                user={userData}
                currentUser={currentUser}
                onAvatarClick={onAvatarClick}
                onAccountClick={onAccountClick}
                onLogoutClick={onLogoutClick}
            />
        ) : (
            <AuthNo
                onLoginClick={onLoginClick}
                onRegisterClick={onRegisterClick}
                loginErrorMessage={loginErrorMessage}
            />
        );
    };

    render() {
        return <section className="header-auth">{this.checkAuth()}</section>;
    }
}

Auth.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    onAccountClick: PropTypes.func,
    onLoginClick: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    onLogoutClick: PropTypes.func,
    onRegisterClick: PropTypes.func,
    loginErrorMessage: PropTypes.string
};

export default Auth;
