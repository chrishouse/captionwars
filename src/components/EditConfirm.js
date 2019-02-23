import React from "react";
import PropTypes from "prop-types";

const EditConfirm = ({ handleNeverMind, handleImSure } = this.props) => {
    return (
        <div className="overlay edit-confirm">
            <div className="dialog edit-confirm-dialog">
                <i className="fas fa-exclamation" />
                Are you sure you want to edit this entry? Doing so will reset
                its likes to zero.
            </div>
            <div className="edit-confirm-buttons">
                <button
                    className="button button-grey"
                    type="submit"
                    onClick={handleNeverMind}
                >
                    Oh. Never mind.
                </button>
                <button className="button" type="submit" onClick={handleImSure}>
                    Yes, I&#39;m sure.
                </button>
            </div>
        </div>
    );
};

EditConfirm.propTypes = {
    handleNeverMind: PropTypes.func,
    handleImSure: PropTypes.func
};

export default EditConfirm;
