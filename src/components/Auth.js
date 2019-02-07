import React from "react";
import AuthYes from "./AuthYes";
import AuthNo from "./AuthNo";

class Auth extends React.Component {
    state = {
        authenticated: false
    };
    render() {
        return (
            <section className="header-auth">
                {this.state.authenticated ? <AuthYes /> : <AuthNo />}
            </section>
        );
    }
}

export default Auth;
