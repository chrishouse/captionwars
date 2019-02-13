import React from "react";
import PropTypes from "prop-types";

const ContestPhoto = props => {
    return (
        <section className="contest-photo">
            <img src={`/images/contests/${props.contestPhoto}.jpg`} />
        </section>
    );
};

ContestPhoto.propTypes = {
    contestPhoto: PropTypes.number
};

export default ContestPhoto;
