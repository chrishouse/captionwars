import React from "react";
import PropTypes from "prop-types";
import * as api from "../api";

class Register extends React.Component {
    state = {
        userName: "",
        password: "",
        email: "",
        confirm: "",
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
            if (this.state.email !== this.state.confirm) {
                this.setState({ error: "Email values do not match" });
            } else {
                if (resp.status !== 200) {
                    this.setState({
                        error: resp.data.msg
                    });
                } else if (resp.status === 200) {
                    this.props.handleRegisterSuccess();
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
                    <label htmlFor="confirm">Confirm email: </label>
                    <input
                        type="email"
                        name="confirm"
                        placeholder="Your email"
                        onChange={this.onChange}
                        value={confirm}
                    />
                    <div className="register-buttons">
                        <button
                            className="button button-grey"
                            onClick={onCancelClick}
                            tabIndex="-1"
                        >
                            Cancel
                        </button>
                        <button className="button" type="submit">
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
