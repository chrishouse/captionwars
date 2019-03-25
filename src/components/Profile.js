import React from "react";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { profileId, userData, currentUser, onAvatarClick } = this.props;
        const {
            userName,
            likesReceived,
            likesGiven,
            contestsEntered,
            contestsFollowing,
            realName,
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
                />
                <main className="main profile-content">
                    <header className="profile-header">
                        <div className="profile-photo">
                            <img src={`/images/users/${profileId}.jpg`} />
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
                </main>
            </main>
        );
    }
}

Profile.propTypes = {
    profileId: PropTypes.string,
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func
};

export default Profile;
