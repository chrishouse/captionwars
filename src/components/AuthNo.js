import React from "react";
import PropTypes from "prop-types";

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
        const { onLoginClick, onRegisterClick } = this.props;
        return (
            <div className="auth auth-no">
                <form>
                    <input
                        type="text"
                        placeholder="username"
                        onChange={this.handleUsernameChange}
                        value={this.state.inputUsername}
                    />
                    <input
                        type="password"
                        placeholder="password"
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
                </form>
                <nav className="header-links">
                    <span>
                        New to Caption Wars?
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
    onRegisterClick: PropTypes.func
};

export default AuthNo;
