import React from "react";
import PropTypes from "prop-types";

class UserMenu extends React.Component {
    // Define the event listener for when the body is clicked (to close the user menu)
    bodyClick = e => {
        if (
            !e.target.classList.contains("user-menu") &&
            !e.target.classList.contains("user-menu-link") &&
            !e.target.classList.contains("user-menu-open")
        ) {
            this.props.menuToggle();
        }
    };
    // Add the click event listener to body when the user menu mounts
    componentDidMount() {
        let body = document.querySelector("body");
        body.addEventListener("click", this.bodyClick);
    }
    // And then remove it when the user menu will unmount
    componentWillUnmount() {
        let body = document.querySelector("body");
        body.removeEventListener("click", this.bodyClick);
    }

    render() {
        return (
            <nav className="user-menu">
                <ul>
                    <li>
                        <a
                            className="user-menu-link"
                            id="profile"
                            onClick={() =>
                                this.props.onAvatarClick(this.props.currentUser)
                            }
                        >
                            <i className="far fa-user-circle" /> Profile
                        </a>
                    </li>
                    <li>
                        <a
                            className="user-menu-link"
                            id="account"
                            onClick={() =>
                                this.props.onAccountClick(
                                    this.props.currentUser
                                )
                            }
                        >
                            <i className="fas fa-cog" /> Account
                        </a>
                    </li>
                    <li>
                        <a
                            className="user-menu-link"
                            id="logout"
                            onClick={e => this.props.onLogoutClick(e)}
                        >
                            <i className="fas fa-sign-out-alt" /> Log out
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

UserMenu.propTypes = {
    menuToggle: PropTypes.func,
    onAvatarClick: PropTypes.func,
    currentUser: PropTypes.string,
    onAccountClick: PropTypes.func,
    onLogoutClick: PropTypes.func
};

export default UserMenu;
