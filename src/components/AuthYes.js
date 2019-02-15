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
        const { user } = this.props;

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
                    user={user[0].userId}
                    likesReceived={user[0].likesReceived}
                />
                <UserAlerts />
                {this.state.menuIsActive ? (
                    <UserMenu menuToggle={this.handleClick} />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

AuthYes.propTypes = {
    user: PropTypes.array
};

export default AuthYes;
