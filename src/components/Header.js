import React from "react";
import Auth from "./Auth";
import PropTypes from "prop-types";

const Header = ({
    userData,
    currentUser,
    onAvatarClick,
    onAccountClick,
    onLoginClick,
    isAuthenticated,
    onHomeClick,
    onLogoutClick,
    onRegisterClick,
    loginErrorMessage
}) => {
    return (
        <header className="main-header">
            <section className="header-content inner">
                <div className="logo-container">
                    <a onClick={onHomeClick}>
                        <img
                            src="/images/assets/logo.png"
                            alt="Caption Wars Logo"
                        />
                    </a>
                    <h1>The never-ending caption contest</h1>
                </div>
                <Auth
                    userData={userData}
                    currentUser={currentUser}
                    onAvatarClick={onAvatarClick}
                    onAccountClick={onAccountClick}
                    onLoginClick={onLoginClick}
                    isAuthenticated={isAuthenticated}
                    onLogoutClick={onLogoutClick}
                    onRegisterClick={onRegisterClick}
                    loginErrorMessage={loginErrorMessage}
                />
            </section>
        </header>
    );
};

Header.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    onAccountClick: PropTypes.func,
    onLoginClick: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    onHomeClick: PropTypes.func,
    onLogoutClick: PropTypes.func,
    onRegisterClick: PropTypes.func,
    loginErrorMessage: PropTypes.string
};

export default Header;
