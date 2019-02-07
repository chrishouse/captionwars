import React from "react";
import Auth from "./Auth";

const Header = () => {
    return (
        <header className="main-header">
            <section className="header-content inner">
                <div className="logo-container">
                    <a href="/">
                        <img src="images/logo.png" alt="Caption Wars Logo" />
                    </a>
                </div>
                <Auth />
            </section>
        </header>
    );
};

export default Header;
