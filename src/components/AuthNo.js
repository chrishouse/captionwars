import React from "react";
import PropTypes from "prop-types";
import ForgotPassword from "./ForgotPassword";

class AuthNo extends React.Component {
    state = {
        inputUsername: "",
        inputPassword: ""
    };

    handleUsernameChange = e => {
        this.setState({
            inputUsername: e.target.value
        });
    };

    handlePasswordChange = e => {
        this.setState({
            inputPassword: e.target.value
        });
    };

    render() {
        const { onLoginClick, onRegisterClick, loginErrorMessage } = this.props;
        return (
            <div className="auth auth-no">
                <div>
                    <form className="login-form">
                        <input
                            type="text"
                            placeholder="Username"
                            onChange={this.handleUsernameChange}
                            value={this.state.inputUsername}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={this.handlePasswordChange}
                            value={this.state.inputPassword}
                        />
                        <input
                            type="submit"
                            value="Log in"
                            onClick={e =>
                                onLoginClick(
                                    e,
                                    this.state.inputUsername,
                                    this.state.inputPassword
                                )
                            }
                        />
                        <div
                            className={
                                "auth-message" +
                                (loginErrorMessage ? " visible" : "")
                            }
                        >
                            {loginErrorMessage}
                        </div>
                    </form>
                    <ForgotPassword />
                </div>
                <nav className="header-links">
                    <span>
                        New to Caption Wars?&nbsp;
                        <br />
                        <a onClick={onRegisterClick}>Register here</a> (it&#39;s
                        free)
                    </span>
                </nav>
            </div>
        );
    }
}

AuthNo.propTypes = {
    onLoginClick: PropTypes.func,
    onRegisterClick: PropTypes.func,
    loginErrorMessage: PropTypes.string
};

export default AuthNo;
