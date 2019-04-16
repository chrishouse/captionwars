import React, { Suspense } from "react";
import PropTypes from "prop-types";

// Our dynamic imports:
const AuthYes = React.lazy(() => import("./AuthYes"));
const AuthNo = React.lazy(() => import("./AuthNo"));

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
            <Suspense fallback={<div />}>
                <AuthYes
                    user={userData}
                    currentUser={currentUser}
                    onAvatarClick={onAvatarClick}
                    onAccountClick={onAccountClick}
                    onLogoutClick={onLogoutClick}
                />
            </Suspense>
        ) : (
            <Suspense fallback={<div />}>
                <AuthNo
                    onLoginClick={onLoginClick}
                    onRegisterClick={onRegisterClick}
                    loginErrorMessage={loginErrorMessage}
                />
            </Suspense>
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
