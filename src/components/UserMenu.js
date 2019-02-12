import React from "react";

class UserMenu extends React.Component {
    state = {
        isActive: true
    };

    render() {
        return (
            <div
                className={"user-menu" + (this.state.isActive ? " active" : "")}
            >
                ... user menu goes here...
            </div>
        );
    }
}

export default UserMenu;
