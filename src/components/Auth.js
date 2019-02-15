import React from "react";
import AuthYes from "./AuthYes";
import AuthNo from "./AuthNo";
import PropTypes from "prop-types";

class Auth extends React.Component {
    state = {
        authenticated: true
    };
    render() {
        const { authenticated } = this.state;
        const { userData } = this.props;

        return (
            <section className="header-auth">
                {authenticated ? <AuthYes user={userData} /> : <AuthNo />}
            </section>
        );
    }
}

Auth.propTypes = {
    userData: PropTypes.array
};

export default Auth;
