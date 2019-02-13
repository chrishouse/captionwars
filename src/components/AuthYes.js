import React from "react";
import UserAvatar from "./UserAvatar";
import UserAlerts from "./UserAlerts";
import UserMenu from "./UserMenu";
import PropTypes from "prop-types";

class AuthYes extends React.Component {
    state = {
        menuIsActive: false
    };

    menuToggle = () => {
        this.setState({
            menuIsActive: !this.state.menuIsActive
        });
    };

    render() {
        return (
            <div className="auth auth-yes">
                <i
                    className={
                        "fas fa-chevron-down" +
                        (this.state.menuIsActive ? " user-menu-open" : "")
                    }
                    onClick={this.menuToggle}
                />
                <UserAvatar
                    user={this.props.user[0].userId}
                    likesReceived={this.props.user[0].likesReceived}
                />
                <UserAlerts />
                {this.state.menuIsActive ? (
                    <UserMenu menuToggle={this.menuToggle} />
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
