import React from "react";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    };

    render() {
        const {
            profileId,
            userData,
            currentUser,
            onAvatarClick,
            isAuthenticated,
            onHomeClick
        } = this.props;
        const {
            userName,
            likesReceived,
            likesGiven,
            contestsEntered,
            contestsFollowing,
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
        } = userData[profileId];
        return (
            <main className="main-container inner">
                <Sidebar
                    userData={userData}
                    currentUser={currentUser}
                    onAvatarClick={onAvatarClick}
                    isAuthenticated={isAuthenticated}
                />
                <main className="main">
                    <section className="profile-content">
                        <a className="home-link" onClick={onHomeClick}>
                            <i className="fas fa-arrow-left" />
                            <i className="fas fa-home" />
                        </a>
                        <header className="profile-header">
                            <div className="profile-photo">
                                <img src={`/images/users/${avatar}`} />
                            </div>
                            <p className="profile-username">{userName}</p>
                        </header>
                        <section className="profile-stats-container">
                            <div className="profile-stat profile-stats-likes-received">
                                <p>
                                    Likes
                                    <br />
                                    Received
                                </p>
                                <div className="profile-stat-number">
                                    {likesReceived.length}
                                </div>
                            </div>
                            <div className="profile-stat profile-stats-likes-givn">
                                <p>
                                    Likes
                                    <br />
                                    Given
                                </p>
                                <div className="profile-stat-number">
                                    {likesGiven.length}
                                </div>
                            </div>
                            <div className="profile-stat profile-stats-contests-entered">
                                <p>
                                    Contests
                                    <br />
                                    Entered
                                </p>
                                <div className="profile-stat-number">
                                    {contestsEntered.length}
                                </div>
                            </div>
                            <div className="profile-stat profile-stats-contests-following">
                                <p>
                                    Contests
                                    <br />
                                    Following
                                </p>
                                <div className="profile-stat-number">
                                    {contestsFollowing.length}
                                </div>
                            </div>
                        </section>
                        <section className="profile-details-container">
                            {realName ? (
                                <div className="profile-detail">
                                    Real Name: <span>{realName}</span>
                                </div>
                            ) : null}
                            {age ? (
                                <div className="profile-detail">
                                    Age: <span>{age}</span>
                                </div>
                            ) : null}
                            {gender ? (
                                <div className="profile-detail">
                                    Gender: <span>{gender}</span>
                                </div>
                            ) : null}
                            {location ? (
                                <div className="profile-detail">
                                    Location: <span>{location}</span>
                                </div>
                            ) : null}
                            {email ? (
                                <div className="profile-detail">
                                    Email:{" "}
                                    <span>
                                        <a href={"mailto:" + email}>{email}</a>
                                    </span>
                                </div>
                            ) : null}
                            {website ? (
                                <div className="profile-detail">
                                    Website:{" "}
                                    <span>
                                        <a href={website}>{website}</a>
                                    </span>
                                </div>
                            ) : null}
                            {facebook ||
                            twitter ||
                            instagram ||
                            pinterest ||
                            linkedin ||
                            youtube ? (
                                <div className="profile-detail">
                                    {facebook ? (
                                        <span>
                                            <a href={facebook}>
                                                <i className="fab fa-facebook-square" />
                                            </a>
                                        </span>
                                    ) : null}
                                    {twitter ? (
                                        <span>
                                            <a href={twitter}>
                                                <i className="fab fa-twitter-square" />
                                            </a>
                                        </span>
                                    ) : null}
                                    {instagram ? (
                                        <span>
                                            <a href={instagram}>
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </span>
                                    ) : null}
                                    {pinterest ? (
                                        <span>
                                            <a href={pinterest}>
                                                <i className="fab fa-pinterest-square" />
                                            </a>
                                        </span>
                                    ) : null}
                                    {linkedin ? (
                                        <span>
                                            <a href={linkedin}>
                                                <i className="fab fa-linkedin" />
                                            </a>
                                        </span>
                                    ) : null}
                                    {youtube ? (
                                        <span>
                                            <a href={youtube}>
                                                <i className="fab fa-youtube" />
                                            </a>
                                        </span>
                                    ) : null}
                                </div>
                            ) : null}
                        </section>
                    </section>
                </main>
            </main>
        );
    }
}

Profile.propTypes = {
    profileId: PropTypes.string,
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    onHomeClick: PropTypes.func
};

export default Profile;
