import React from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import Recaptcha from "react-recaptcha";

class Register extends React.Component {
    state = {
        userName: "",
        password: "",
        email: "",
        confirmEmail: "",
        confirmPassword: "",
        realName: "",
        avatar: null,
        error: null,
        submitDisabled: false,
        recaptchaVerified: false
    };

    onChange = e => {
        const name = e.target.name;
        const text = e.target.value;
        this.setState({
            [name]: text
        });
    };

    verifyRecaptcha = () => {
        this.setState({
            recaptchaVerified: true
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            submitDisabled: true
        });
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: "Passwords do not match",
                submitDisabled: false
            });
        } else if (this.state.email !== this.state.confirmEmail) {
            this.setState({
                error: "Emails do not match",
                submitDisabled: false
            });
        } else if (!this.state.recaptchaVerified) {
            this.setState({
                error: "Please check the Recaptcha",
                submitDisabled: false
            });
        } else {
            api.register(
                e.target.userName.value,
                e.target.password.value,
                e.target.email.value
            ).then(resp => {
                if (resp.status !== 200) {
                    this.setState({
                        error: resp.data.msg,
                        submitDisabled: false
                    });
                } else if (resp.status === 200) {
                    // If avatar is chosen call the upload api
                    if (this.state.avatar) {
                        const user = resp.data.user.id;
                        const token = resp.data.token;
                        const formData = new FormData();
                        formData.append("avatar", this.uploadInput.files[0]);
                        formData.append("user", user);
                        // Upload the file
                        api.avatarUpload(token, formData).then(resp => {
                            if (resp.status === 400 || resp.status === 500) {
                                this.setState({
                                    error: resp.data.msg
                                });
                            } else {
                                // Then set the new file as the user's avatar
                                api.edit(token, "avatar", `${user}.jpg`).then(
                                    resp => {
                                        if (resp.status === 400) {
                                            this.setState({
                                                error: resp.data.msg
                                            });
                                        } else {
                                            this.props.handleRegisterSuccess();
                                        }
                                    }
                                );
                            }
                        });
                    } else {
                        this.props.handleRegisterSuccess();
                    }
                }
            });
        }
    };

    render() {
        const {
            userName,
            password,
            email,
            confirmEmail,
            confirmPassword,
            error
        } = this.state;
        const { onCancelClick } = this.props;
        return (
            <div className="register-modal overlay">
                <form className="dialog" onSubmit={this.onSubmit}>
                    <h3>Register</h3>
                    {error ? <h4 className="register-error">{error}</h4> : null}
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={this.onChange}
                        value={userName}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={password}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={confirmPassword}
                        required
                    />
                    <label htmlFor="email">Your email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        onChange={this.onChange}
                        value={email}
                        required
                    />
                    <label htmlFor="confirmEmail">Confirm email</label>
                    <input
                        type="email"
                        name="confirmEmail"
                        placeholder="Your email"
                        onChange={this.onChange}
                        value={confirmEmail}
                        required
                    />
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        name="avatar"
                        onChange={this.onChange}
                        ref={ref => {
                            this.uploadInput = ref;
                        }}
                    />
                    <Recaptcha
                        sitekey="6LfHJJ4UAAAAAL_ke8QA4fLwYDnXaV8nB4BCYdIC"
                        verifyCallback={this.verifyRecaptcha}
                    />
                    <div className="register-buttons">
                        <button
                            className="button button-grey"
                            onClick={onCancelClick}
                            tabIndex="-1"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="button"
                            type="submit"
                            disabled={this.state.submitDisabled}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    handleRegisterSuccess: PropTypes.func,
    onCancelClick: PropTypes.func
};

export default Register;
