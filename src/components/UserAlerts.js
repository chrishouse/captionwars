import React from "react";

class UserAlerts extends React.Component {
    state = {
        AlertActive: true
    };

    render() {
        const { AlertActive } = this.state;

        return (
            <div className="user-alerts">
                {AlertActive ? (
                    <i className="alert-bell fas fa-bell" />
                ) : (
                    <i className="alert-bell far fa-bell" />
                )}
            </div>
        );
    }
}

export default UserAlerts;
