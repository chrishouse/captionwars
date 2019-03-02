import React from "react";
import Auth from "./Auth";
import PropTypes from "prop-types";

const Header = ({ userData, currentUser, onAvatarClick }) => {
    return (
        <header className="main-header">
            <section className="header-content inner">
                <div className="logo-container">
                    <a href="/">
                        <img
                            src="images/assets/logo.png"
                            alt="Caption Wars Logo"
                        />
                    </a>
                </div>
                <Auth
                    userData={userData}
                    currentUser={currentUser}
                    onAvatarClick={onAvatarClick}
                />
            </section>
        </header>
    );
};

Header.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.number,
    onAvatarClick: PropTypes.func
};

export default Header;
