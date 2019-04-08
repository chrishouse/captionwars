import React from "react";
import PropTypes from "prop-types";
import * as api from "../api";

class Register extends React.Component {
    state = {
        userName: "",
        password: "",
        email: "",
        realName: "",
        error: null
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
        api.register(
            e.target.userName.value,
            e.target.password.value,
            e.target.email.value
        ).then(resp => {
            if (resp.status !== 200) {
                this.setState({
                    error: resp.data.msg
                });
            } else if (resp.status === 200) {
                this.props.handleRegisterSuccess();
            }
        });
    };

    render() {
        const { userName, password, email, error } = this.state;
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
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={password}
                    />
                    <label htmlFor="email">Your email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        onChange={this.onChange}
                        value={email}
                    />
                    <div className="register-buttons">
                        <input className="register-submit" type="submit" />
                        <button
                            className="register-cancel"
                            onClick={onCancelClick}
                        >
                            Cancel
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
