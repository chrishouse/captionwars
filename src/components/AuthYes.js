import React from "react";
import UserAvatar from "./UserAvatar";
import UserAlerts from "./UserAlerts";
import UserMenu from "./UserMenu";

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
                <UserAvatar />
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

export default AuthYes;
