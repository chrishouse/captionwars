import React from "react";
import PropTypes from "prop-types";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { profileId, realName } = this.props;
        return (
            <main className="profile-content">
                {profileId} {realName}
            </main>
        );
    }
}

Profile.propTypes = {
    realName: PropTypes.string,
    profileId: PropTypes.number
};

export default Profile;
