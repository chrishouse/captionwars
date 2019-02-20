import React from "react";
import PropTypes from "prop-types";

class EntryInput extends React.Component {
    state = {
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

    render() {
        const {
            inputText,
            textareaHeight,
            characterLimit,
            textareaAlert
        } = this.state;

        return (
            <div className="entry-input">
                <textarea
                    placeholder="Your entry..."
                    value={inputText}
                    onChange={this.handleTextChange}
                    maxLength={characterLimit}
                    style={{ height: `${textareaHeight}px` }}
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
        );
    }
}

EntryInput.propTypes = {
    handleSubmit: PropTypes.func,
    contestData: PropTypes.object
};

export default EntryInput;
