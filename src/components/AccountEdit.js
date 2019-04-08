import React from "react";
import PropTypes from "prop-types";

class AccountEdit extends React.Component {
    handleEditAccountSubmit = () => {
        // Edit account info here
    };

    render() {
        const { prettyField, dataField } = this.props.fieldToEdit;
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
                    <form className="account-edit-form">
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
                        {dataField === "gender" ? (
                            <select>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Unspecified</option>
                            </select>
                        ) : dataField === "password" ||
                          dataField === "email" ? (
                            <span>
                                <input name={dataField} type={fieldType} />
                                <br />
                                <label htmlFor={dataField}>Confirm: </label>
                                <input name={dataField} type={fieldType} />
                            </span>
                        ) : (
                            <span>
                                {urlPrefix}
                                <input name={dataField} type={fieldType} />
                            </span>
                        )}
                    </form>
                </div>

                <div className="edit-confirm-buttons">
                    <button
                        className="button button-grey"
                        type="submit"
                        onClick={this.props.onEditAccountCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="button"
                        type="submit"
                        onClick={this.handleEditAccountSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

AccountEdit.propTypes = {
    onEditAccountCancel: PropTypes.func,
    fieldToEdit: PropTypes.object
};

export default AccountEdit;
