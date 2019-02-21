import React from "react";
import PropTypes from "prop-types";

class EntryInput extends React.Component {
    state = {
        visible: true,
        inputText: "",
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
                visible: false,
                inputText: "",
                textareaHeight: 100,
                characterCount: 0,
                textareaAlert: null
            });
            this.props.onEntrySubmit();
        } else {
            this.setState({
                textareaAlert: "Please type something"
            });
        }
    };

    handleTextChange = e => {
        if (e.key === "Enter") {
            this.handleSubmitClick();
        }
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

    render() {
        const {
            visible,
            inputText,
            textareaHeight,
            characterLimit,
            textareaAlert
        } = this.state;

        return (
            <React.Fragment>
                <div
                    className={`entry-input${
                        visible ? "" : " entry-input-hidden"
                    }`}
                >
                    <textarea
                        placeholder="Your entry..."
                        value={inputText}
                        onChange={this.handleTextChange}
                        maxLength={characterLimit}
                        style={{ height: `${textareaHeight}px` }}
                        onKeyDown={this.handleTextChange}
                    />
                    <p className="character-alert">{textareaAlert}</p>
                    <button
                        className="button"
                        type="submit"
                        onClick={this.handleSubmitClick}
                    >
                        Submit
                    </button>
                </div>
                <div
                    className={`entry-msg-cont${
                        visible ? " entry-msg-hidden" : ""
                    }`}
                >
                    <p className="entry-msg">
                        You&#39;ve entered this contest.
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

EntryInput.propTypes = {
    handleSubmit: PropTypes.func,
    contestData: PropTypes.object,
    onEntrySubmit: PropTypes.func
};

export default EntryInput;
