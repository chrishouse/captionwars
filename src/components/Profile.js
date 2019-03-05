import React from "react";
import PropTypes from "prop-types";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { profileId, userData } = this.props;
        return (
            <main className="profile-content">
                {profileId}
                {userData[profileId].realName}
                {userData[profileId].userName}
                <img src={`/images/users/${profileId}.jpg`} />
            </main>
        );
    }
}

Profile.propTypes = {
    userData: PropTypes.object,
    profileId: PropTypes.string
};

export default Profile;
