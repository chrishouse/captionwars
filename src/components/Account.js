import React from "react";
import Sidebar from "./Sidebar";
import AccountEdit from "./AccountEdit";
import PropTypes from "prop-types";
import * as api from "../api";

class Account extends React.Component {
    state = {
        token: localStorage.getItem("token"),
        authorized: false,
        user: null,
        error: null,
        editMode: false,
        fieldToEdit: {}
    };

    loadUser = () => {
        // Check token, load user and set editMode to false (in case this is firing from a successful edit)
        api.account(this.state.token).then(resp => {
            if (resp.status === 200) {
                this.setState({
                    authorized: true,
                    user: resp.data,
                    editMode: false
                });
            } else {
                this.setState({
                    authorized: false,
                    user: null,
                    error: resp,
                    editMode: false
                });
            }
        });
    };

    componentDidMount = () => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);

        this.loadUser();
    };

    handleEditAdd = (prettyField, dataField) => {
        this.setState({
            editMode: true,
            fieldToEdit: { prettyField, dataField }
        });
    };

    handleEditAccountCancel = () => {
        this.setState({
            editMode: false
        });
    };

    getContent = authorized => {
        if (authorized) {
            const {
                userData,
                onAvatarClick,
                isAuthenticated,
                onHomeClick
            } = this.props;
            const {
                _id,
                userName,
                realName,
                avatar,
                age,
                gender,
                location,
                email,
                website,
                facebook,
                twitter,
                instagram,
                pinterest,
                linkedin,
                youtube
            } = this.state.user;
            return (
                <main className="main-container inner">
                    {this.state.editMode ? (
                        <AccountEdit
                            onEditAccountCancel={this.handleEditAccountCancel}
                            fieldToEdit={this.state.fieldToEdit}
                            user={_id}
                            token={this.state.token}
                            onEditSuccess={this.loadUser}
                        />
                    ) : null}
                    <Sidebar
                        userData={userData}
                        currentUser={_id}
                        onAvatarClick={onAvatarClick}
                        isAuthenticated={isAuthenticated}
                    />
                    <main className="main">
                        <section className="profile-content account-content">
                            <a className="home-link" onClick={onHomeClick}>
                                <i className="fas fa-arrow-left" />
                                <i className="fas fa-home" />
                            </a>
                            <header className="profile-header">
                                <div className="profile-photo account-photo">
                                    <img src={`/images/users/${avatar}`} />
                                    &nbsp;
                                    <i
                                        className="fas fa-pencil-alt"
                                        onClick={() =>
                                            this.handleEditAdd(
                                                "Avatar",
                                                "avatar"
                                            )
                                        }
                                    />
                                </div>
                                <p className="profile-username">
                                    {userName}
                                    &nbsp;
                                    <i
                                        className="fas fa-pencil-alt"
                                        onClick={() =>
                                            this.handleEditAdd(
                                                "Username",
                                                "userName"
                                            )
                                        }
                                    />
                                </p>
                            </header>

                            <section className="profile-details-container">
                                <div className="profile-detail">
                                    Password:&nbsp;
                                    <span>
                                        <span>********</span>
                                        <span>
                                            {" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Password",
                                                        "password"
                                                    )
                                                }
                                            />
                                        </span>
                                    </span>
                                </div>
                                <div className="profile-detail">
                                    Email:&nbsp;
                                    <span>
                                        <a href={"mailto:" + email}>{email}</a>
                                        <span>
                                            {" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Email",
                                                        "email"
                                                    )
                                                }
                                            />
                                        </span>
                                    </span>
                                </div>
                                <div className="profile-detail">
                                    Real Name
                                    <span>
                                        {realName ? (
                                            <span>
                                                : {realName}{" "}
                                                <i
                                                    className="fas fa-pencil-alt"
                                                    onClick={() =>
                                                        this.handleEditAdd(
                                                            "Real Name",
                                                            "realName"
                                                        )
                                                    }
                                                />
                                            </span>
                                        ) : (
                                            <span>
                                                &nbsp;
                                                <i
                                                    className="fas fa-plus"
                                                    onClick={() =>
                                                        this.handleEditAdd(
                                                            "Real Name",
                                                            "realName"
                                                        )
                                                    }
                                                />
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className="profile-detail">
                                    Age
                                    {age ? (
                                        <span>
                                            : {age}{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Age",
                                                        "age"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            &nbsp;
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Age",
                                                        "age"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    Gender
                                    {gender ? (
                                        <span>
                                            : {gender}{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Gender",
                                                        "gender"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            &nbsp;
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Gender",
                                                        "gender"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    Location
                                    {location ? (
                                        <span>
                                            : {location}{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Location",
                                                        "location"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            &nbsp;
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Location",
                                                        "location"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>

                                <div className="profile-detail">
                                    Website
                                    {website ? (
                                        <span>
                                            : <a href={website}>{website}</a>{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Website",
                                                        "website"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            &nbsp;
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "Website",
                                                        "website"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>

                                <div className="profile-detail">
                                    <i className="fab fa-facebook-square" />
                                    {facebook ? (
                                        <span>
                                            {
                                                <a
                                                    href={`https://www.facebook.com/${facebook}`}
                                                >
                                                    {facebook}
                                                </a>
                                            }{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-facebook-square",
                                                        "facebook"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-facebook-square",
                                                        "facebook"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    <i className="fab fa-twitter-square" />
                                    {twitter ? (
                                        <span>
                                            {
                                                <a
                                                    href={`https://twitter.com/${twitter}`}
                                                >
                                                    {twitter}
                                                </a>
                                            }{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-twitter-square",
                                                        "twitter"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-twitter-square",
                                                        "twitter"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    <i className="fab fa-instagram" />
                                    {instagram ? (
                                        <span>
                                            {
                                                <a
                                                    href={`https://www.instagram.com/${instagram}`}
                                                >
                                                    {instagram}
                                                </a>
                                            }{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-instagram",
                                                        "instagram"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-instagram",
                                                        "instagram"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    <i className="fab fa-pinterest-square" />
                                    {pinterest ? (
                                        <span>
                                            {
                                                <a
                                                    href={`https://www.pinterest.com/${pinterest}`}
                                                >
                                                    {pinterest}
                                                </a>
                                            }{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-pinterest-square",
                                                        "pinterest"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-pinterest-square",
                                                        "pinterest"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    <i className="fab fa-linkedin" />
                                    {linkedin ? (
                                        <span>
                                            {
                                                <a
                                                    href={`https://www.linkedin.com/${linkedin}`}
                                                >
                                                    {linkedin}
                                                </a>
                                            }{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-linkedin",
                                                        "linkedin"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-linkedin",
                                                        "linkedin"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                                <div className="profile-detail">
                                    <i className="fab fa-youtube" />
                                    {youtube ? (
                                        <span>
                                            {
                                                <a
                                                    href={`https://www.youtube.com/${youtube}`}
                                                >
                                                    {youtube}
                                                </a>
                                            }{" "}
                                            <i
                                                className="fas fa-pencil-alt"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-youtube",
                                                        "youtube"
                                                    )
                                                }
                                            />
                                        </span>
                                    ) : (
                                        <span>
                                            <i
                                                className="fas fa-plus"
                                                onClick={() =>
                                                    this.handleEditAdd(
                                                        "fab fa-youtube",
                                                        "youtube"
                                                    )
                                                }
                                            />
                                        </span>
                                    )}
                                </div>
                            </section>
                        </section>
                    </main>
                </main>
            );
        } else return <div />;
    };

    render() {
        return this.getContent(this.state.authorized);
    }
}

Account.propTypes = {
    accountId: PropTypes.string,
    userData: PropTypes.object,
    onAvatarClick: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    onHomeClick: PropTypes.func
};

export default Account;
