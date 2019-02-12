import React from "react";

class UserAlerts extends React.Component {
    state = {
        AlertActive: false
    };

    render() {
        return (
            <div className="user-alerts">
                {this.state.AlertActive ? (
                    <i className="alert-bell fas fa-bell" />
                ) : (
                    <i className="alert-bell far fa-bell" />
                )}
            </div>
        );
    }
}

export default UserAlerts;
