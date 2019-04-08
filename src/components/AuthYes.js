import React from "react";
import UserAvatar from "./UserAvatar";
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
        const {
            user,
            currentUser,
            onAvatarClick,
            onAccountClick,
            onLogoutClick
        } = this.props;

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
                    avatar={user[currentUser].avatar}
                    onAvatarClick={onAvatarClick}
                />
                {/* Alerts will be Phase 2 */}
                {/* <UserAlerts /> */}
                {this.state.menuIsActive ? (
                    <UserMenu
                        menuToggle={this.handleClick}
                        onAvatarClick={onAvatarClick}
                        currentUser={currentUser}
                        onAccountClick={onAccountClick}
                        onLogoutClick={onLogoutClick}
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
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    onAccountClick: PropTypes.func,
    onLogoutClick: PropTypes.func
};

export default AuthYes;
