import React from "react";
import Auth from "./Auth";
import PropTypes from "prop-types";

const Header = props => {
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
                <Auth userData={props.userData} />
            </section>
        </header>
    );
};

Header.propTypes = {
    userData: PropTypes.array
};

export default Header;
