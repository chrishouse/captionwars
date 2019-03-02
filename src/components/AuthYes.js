import React from "react";
import UserAvatar from "./UserAvatar";
import UserAlerts from "./UserAlerts";
import UserMenu from "./UserMenu";
import PropTypes from "prop-types";

class AuthYes extends React.Component {
    state = {
        menuIsActive: false
    };

    handleClick = () => {
        this.setState({
            menuIsActive: !this.state.menuIsActive
        });
    };

    render() {
        const { menuIsActive } = this.state;
        const { user, currentUser, onAvatarClick } = this.props;

        return (
            <div className="auth auth-yes">
                <i
                    className={
                        "fas fa-chevron-down" +
                        (menuIsActive ? " user-menu-open" : "")
                    }
                    onClick={this.handleClick}
                />
                <UserAvatar
                    user={currentUser}
                    likesReceived={user[currentUser].likesReceived}
                    currentUser={currentUser}
                    onAvatarClick={onAvatarClick}
                />
                <UserAlerts />
                {this.state.menuIsActive ? (
                    <UserMenu
                        menuToggle={this.handleClick}
                        onAvatarClick={onAvatarClick}
                        currentUser={currentUser}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

AuthYes.propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.number,
    onAvatarClick: PropTypes.func
};

export default AuthYes;
