import React from "react";
import UserAvatar from "./UserAvatar";
import UserAlerts from "./UserAlerts";
import UserMenu from "./UserMenu";

const AuthYes = () => {
    return (
        <div className="auth auth-yes">
            <i className="fas fa-chevron-down" />
            <UserAvatar />
            <UserAlerts />
            <UserMenu />
        </div>
    );
};

export default AuthYes;
