import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
import * as api from "../api";

class AccountEdit extends React.Component {
    state = {
        fieldInput: "",
        confirmInput: "",
        error: null,
        loading: false,
        submitDisabled: false
    };

    handleEditAccountSubmit = (e, dataField) => {
        e.preventDefault();

        this.setState({
            loading: true,
            submitDisabled: true
        });

        // Check if the confirm field was filled out (for email and password) and make sure the values match
        if (
            e.target["confirm"] &&
            this.state.fieldInput !== this.state.confirmInput
        ) {
            this.setState({
                error: "Those values do not match"
            });
            return;
        }
        // Make sure userName length is less than or equal to 25 characters
        if (dataField === "userName" && this.state.fieldInput.length > 25) {
            this.setState({
                error: "That username is too long"
            });
            return;
        } else {
            // If it's an avatar call the upload api
            if (dataField === "avatar") {
                const formData = new FormData();
                formData.append("avatar", this.uploadInput.files[0]);
                formData.append("user", this.props.user);
                // Upload the file
                api.avatarUpload(formData).then(resp => {
                    if (resp.status === 400 || resp.status === 500) {
                        this.setState({
                            error: resp.data.msg,
                            loading: false
                        });
                    } else {
                        // Then set the new file as the user's avatar
                        api.edit(
                            this.props.token,
                            "avatar",
                            `${this.props.user}.jpg`
                        ).then(resp => {
                            if (resp.status === 400) {
                                this.setState({
                                    error: resp.data.msg
                                });
                            } else {
                                this.setState({
                                    loading: false
                                });
                                this.props.onEditSuccess();
                            }
                        });
                    }
                });
            } else {
                // For everything else
                api.edit(
                    this.props.token,
                    dataField,
                    this.state.fieldInput
                ).then(resp => {
                    if (resp.status === 400) {
                        this.setState({
                            error: resp.data.msg
                        });
                    } else {
                        this.setState({
                            loading: false
                        });
                        this.props.onEditSuccess();
                    }
                });
            }
        }
    };

    handleChange = e => {
        this.setState({
            fieldInput: e.target.value
        });
    };

    handleConfirmChange = e => {
        this.setState({
            confirmInput: e.target.value
        });
    };

    render() {
        const { prettyField, dataField } = this.props.fieldToEdit;
        const { fieldInput } = this.state;
        let fieldType;
        let urlPrefix = "";
        switch (dataField) {
            case "avatar":
                fieldType = "";
                break;
            case "userName":
            case "realName":
            case "age":
            case "location":
            case "website":
                fieldType = "text";
                break;
            case "facebook":
                fieldType = "text";
                urlPrefix = "https://www.facebook.com/";
                break;
            case "twitter":
                fieldType = "text";
                urlPrefix = "https://twitter.com/";
                break;
            case "instagram":
                fieldType = "text";
                urlPrefix = "https://www.instagram.com/";
                break;
            case "pinterest":
                fieldType = "text";
                urlPrefix = "https://www.pinterest.com/";
                break;
            case "linkedin":
                fieldType = "text";
                urlPrefix = "https://www.linkedin.com/";
                break;
            case "youtube":
                fieldType = "text";
                urlPrefix = "https://www.youtube.com/";
                break;
            case "password":
                fieldType = "password";
                break;
            case "email":
                fieldType = "email";
                break;
        }
        return (
            <div className="overlay">
                <div className="dialog account-edit-dialog">
                    <form
                        className="account-edit-form"
                        onSubmit={e =>
                            this.handleEditAccountSubmit(e, dataField)
                        }
                        method="post"
                        encType="multipart/form-data"
                    >
                        <p
                            className={
                                "account-edit-error" +
                                (this.state.error ? " visible" : "")
                            }
                        >
                            {this.state.error}
                        </p>
                        <label htmlFor={dataField}>
                            {dataField === "facebook" ||
                            dataField === "twitter" ||
                            dataField === "instagram" ||
                            dataField === "pinterest" ||
                            dataField === "linkedin" ||
                            dataField === "youtube" ? (
                                <i className={prettyField} />
                            ) : (
                                prettyField + ": "
                            )}
                        </label>

                        {dataField === "avatar" ? (
                            <input
                                name={"avatar"}
                                type="file"
                                ref={ref => {
                                    this.uploadInput = ref;
                                }}
                                required
                            />
                        ) : dataField === "gender" ? (
                            <select
                                name="gender-select"
                                onChange={this.handleChange}
                            >
                                <option value="unspecified" defaultValue>
                                    Select
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : dataField === "password" ||
                          dataField === "email" ? (
                            <span>
                                <input
                                    name={dataField}
                                    type={fieldType}
                                    value={fieldInput}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <label htmlFor={dataField}>Confirm: </label>
                                <input
                                    id="confirm"
                                    type={fieldType}
                                    onChange={this.handleConfirmChange}
                                />
                            </span>
                        ) : (
                            <span>
                                {urlPrefix}
                                <input
                                    name={dataField}
                                    type={fieldType}
                                    value={fieldInput}
                                    onChange={this.handleChange}
                                />
                            </span>
                        )}
                        <div className="edit-confirm-buttons">
                            {this.state.loading ? (
                                <div className="avatar-loading">
                                    <Loading />
                                </div>
                            ) : null}
                            <button
                                className="button button-grey"
                                type="submit"
                                onClick={this.props.onEditAccountCancel}
                                tabIndex="-1"
                            >
                                Cancel
                            </button>
                            <input
                                className="button"
                                type="submit"
                                value="Save"
                                disabled={this.state.submitDisabled}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AccountEdit.propTypes = {
    onEditAccountCancel: PropTypes.func,
    fieldToEdit: PropTypes.object,
    user: PropTypes.string,
    token: PropTypes.string,
    onEditSuccess: PropTypes.func
};

export default AccountEdit;
