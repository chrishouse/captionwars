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
                    {/* <label htmlFor="realName">Your real name</label> */}
                    {/* <input
                        type="text"
                        name="realName"
                        placeholder="Your real name"
                        onChange={this.onChange}
                        value={realName}
                    />
                    <label htmlFor="age">Your age</label>
                    <input
                        type="text"
                        name="age"
                        placeholder="Your age"
                        onChange={this.onChange}
                        value={age}
                    />
                    <label htmlFor="gender">Your gender</label>
                    <input
                        type="text"
                        name="gender"
                        placeholder="Your age"
                        onChange={this.onChange}
                        value={gender}
                    />
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="text"
                        name="avatar"
                        placeholder="Avatar"
                        onChange={this.onChange}
                        value={avatar}
                    />
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        name="website"
                        placeholder="website"
                        onChange={this.onChange}
                        value={website}
                    />
                    <label htmlFor="location">Your location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Your location"
                        onChange={this.onChange}
                        value={location}
                    />
                    <label htmlFor="facebook">Your Facebook page</label>
                    <input
                        type="text"
                        name="facebook"
                        placeholder="Your Facebook page"
                        onChange={this.onChange}
                        value={facebook}
                    />
                    <label htmlFor="twitter">Your Twitter page</label>
                    <input
                        type="text"
                        name="twitter"
                        placeholder="Your Twitter page"
                        onChange={this.onChange}
                        value={twitter}
                    />
                    <label htmlFor="instagram">Your Instragram page</label>
                    <input
                        type="text"
                        name="instagram"
                        placeholder="Your Instragram page"
                        onChange={this.onChange}
                        value={instagram}
                    />
                    <label htmlFor="pinterest">Your Pinterest page</label>
                    <input
                        type="text"
                        name="pinterest"
                        placeholder="Your Pinterest page"
                        onChange={this.onChange}
                        value={pinterest}
                    />
                    <label htmlFor="linkedin">Your LinkedIn page</label>
                    <input
                        type="text"
                        name="linkedin"
                        placeholder="Your LinkedIn page"
                        onChange={this.onChange}
                        value={linkedin}
                    />
                    <label htmlFor="youtube">Your YouTube channel</label>
                    <input
                        type="text"
                        name="youtube"
                        placeholder="Your YouTube channel"
                        onChange={this.onChange}
                        value={youtube}
                    /> */}

                    <input type="submit" />
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    handleRegisterSuccess: PropTypes.func
};

export default Register;
