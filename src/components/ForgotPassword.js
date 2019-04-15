import React from "react";
import * as api from "../api";

class ForgotPassword extends React.Component {
    state = {
        enabled: false,
        email: "",
        confirm: false
    };

    handleLinkClick = () => {
        this.setState({
            enabled: true
        });
    };

    handleCancelClick = () => {
        this.setState({
            enabled: false,
            confirm: false,
            email: ""
        });
    };

    onChange = e => {
        this.setState({
            email: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();

        api.passwordReset(this.state.email);

        this.setState({
            confirm: true
        });
        setTimeout(() => {
            this.setState({
                enabled: false,
                confirm: false,
                email: ""
            });
        }, 15000);
    };

    render() {
        return (
            <React.Fragment>
                <p
                    className="forgot-password-link"
                    onClick={this.handleLinkClick}
                >
                    I forgot my password/username
                </p>
                {this.state.enabled ? (
                    <div className="forgot-password-modal overlay">
                        {!this.state.confirm ? (
                            <form className="dialog" onSubmit={this.onSubmit}>
                                <h3>Forgot password/username</h3>
                                <i
                                    className="fas fa-times"
                                    onClick={this.handleCancelClick}
                                />
                                <label htmlFor="email">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    required
                                />
                                <div className="forgot-password-buttons">
                                    <button
                                        className="button button-grey"
                                        onClick={this.handleCancelClick}
                                        tabIndex="-1"
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button className="button" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="dialog confirm-dialog">
                                <p className="forgot-password-confirm">
                                    Thanks. We&#39;ve sent you an email.
                                </p>
                                <button
                                    className="button button-yellow"
                                    onClick={this.handleCancelClick}
                                    type="button"
                                >
                                    Okay
                                </button>
                            </div>
                        )}
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}

export default ForgotPassword;
