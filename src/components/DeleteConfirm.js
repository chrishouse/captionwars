import React from "react";
import PropTypes from "prop-types";

const DeleteConfirm = (
    { handleDeleteNeverMind, handleDeleteImSure } = this.props
) => {
    return (
        <div className="overlay edit-confirm">
            <div className="dialog edit-confirm-dialog">
                <i className="fas fa-exclamation" />
                Are you sure you want to delete this entry? This cannot be
                undone.
            </div>
            <div className="edit-confirm-buttons">
                <button
                    className="button button-grey"
                    type="submit"
                    onClick={handleDeleteNeverMind}
                >
                    Oh. Never mind.
                </button>
                <button
                    className="button"
                    type="submit"
                    onClick={handleDeleteImSure}
                >
                    Yes, I&#39;m sure.
                </button>
            </div>
        </div>
    );
};

DeleteConfirm.propTypes = {
    handleDeleteNeverMind: PropTypes.func,
    handleDeleteImSure: PropTypes.func
};

export default DeleteConfirm;
