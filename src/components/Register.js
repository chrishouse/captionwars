import React from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import Recaptcha from "react-recaptcha";

class Register extends React.Component {
    state = {
        userName: "",
        password: "",
        email: "",
        confirm: "",
        realName: "",
        avatar: null,
        error: null,
        submitDisabled: false
    };

    onChange = e => {
        const name = e.target.name;
        const text = e.target.value;
        this.setState({
            [name]: text
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            submitDisabled: true
        });
        api.register(
            e.target.userName.value,
            e.target.password.value,
            e.target.email.value
        ).then(resp => {
            if (this.state.email !== this.state.confirm) {
                this.setState({ error: "Email values do not match" });
            } else {
                if (resp.status !== 200) {
                    this.setState({
                        error: resp.data.msg
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
                        api.avatarUpload(formData).then(resp => {
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
            }
        });
    };

    render() {
        const { userName, password, email, confirm, error } = this.state;
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
                    <label htmlFor="email">Your email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        onChange={this.onChange}
                        value={email}
                        required
                    />
                    <label htmlFor="confirm">Confirm email</label>
                    <input
                        type="email"
                        name="confirm"
                        placeholder="Your email"
                        onChange={this.onChange}
                        value={confirm}
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
                    <Recaptcha sitekey="6LfHJJ4UAAAAAL_ke8QA4fLwYDnXaV8nB4BCYdIC" />
                    <div className="register-buttons">
                        <button
                            className="button button-grey"
                            onClick={onCancelClick}
                            tabIndex="-1"
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
