import React from "react";
import PropTypes from "prop-types";

class EntryInput extends React.Component {
    state = {
        inputText: this.props.entryText,
        textareaHeight: 100,
        characterLimit: 250,
        characterCount: 0,
        textareaAlert: null
    };

    handleSubmitClick = () => {
        if (this.state.characterCount > 0) {
            this.props.handleSubmit(
                this.props.contestData,
                this.state.inputText
            );
            this.setState({
                inputText: "",
                textareaHeight: 100,
                characterCount: 0,
                textareaAlert: null
            });
        } else {
            this.setState({
                textareaAlert: "Please type something"
            });
        }
    };

    handleTextChange = e => {
        const charDiff = this.state.characterLimit - e.target.value.length;
        if (charDiff <= 20) {
            if (charDiff === 1) {
                this.setState({
                    textareaAlert: `${charDiff} character remaining`
                });
            } else {
                this.setState({
                    textareaAlert: `${charDiff} characters remaining`
                });
            }
        } else {
            this.setState({
                textareaAlert: null
            });
        }
        this.setState({
            inputText: e.target.value,
            textareaHeight: e.target.scrollHeight,
            characterCount: e.target.value.length
        });
    };

    handleCancelClick = () => {
        this.props.handleCancelClick();
    };

    handleSaveClick = () => {
        this.props.handleEntryEditSave(
            this.props.entryData._id,
            this.state.inputText
        );
        this.props.handleCancelClick();
    };

    render() {
        const { editMode, userHasEntered, isAuthenticated } = this.props;

        const {
            inputText,
            textareaHeight,
            characterLimit,
            textareaAlert
        } = this.state;

        return (
            <div className={`entry-input-cont${editMode ? " overlay" : ""}`}>
                <div
                    className={`entry-input${
                        userHasEntered ? " entry-input-hidden" : ""
                    }`}
                >
                    <textarea
                        placeholder={
                            isAuthenticated
                                ? "Your entry..."
                                : "Log in or register to submit an entry."
                        }
                        value={inputText}
                        onChange={this.handleTextChange}
                        maxLength={characterLimit}
                        style={{ height: `${textareaHeight}px` }}
                        onKeyDown={this.handleTextChange}
                        disabled={!isAuthenticated}
                    />
                    <p className="character-alert">{textareaAlert}</p>
                    {!editMode ? (
                        <button
                            className="button"
                            type="submit"
                            onClick={this.handleSubmitClick}
                            disabled={!isAuthenticated}
                        >
                            Submit
                        </button>
                    ) : (
                        <div className="entry-editor-buttons">
                            <button
                                className="button"
                                type="submit"
                                onClick={this.handleSaveClick}
                            >
                                Save
                            </button>
                            <button
                                className="button button-grey button-edit-cancel"
                                type="submit"
                                onClick={this.handleCancelClick}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                <div
                    className={`entry-msg-cont${
                        userHasEntered ? "" : " entry-msg-hidden"
                    }`}
                >
                    <p className="entry-msg">
                        You&#39;ve entered this contest.
                    </p>
                </div>
            </div>
        );
    }
}

EntryInput.propTypes = {
    handleSubmit: PropTypes.func,
    contestData: PropTypes.object,
    onEntrySubmit: PropTypes.func,
    editMode: PropTypes.bool,
    handleCancelClick: PropTypes.func,
    handleEntryEditSave: PropTypes.func,
    entryData: PropTypes.object,
    contestId: PropTypes.number,
    entryText: PropTypes.string,
    userHasEntered: PropTypes.bool,
    isAuthenticated: PropTypes.bool
};

export default EntryInput;
