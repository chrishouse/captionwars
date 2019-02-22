import React from "react";
import EntryInput from "./EntryInput";
import PropTypes from "prop-types";

class EntryEdit extends React.Component {
    state = {
        confirmed: false
    };

    render() {
        const { entryToEdit, handleEntrySubmit, contestData } = this.props;

        return (
            <section className="overlay">
                <div className="entry-editor">
                    <EntryInput
                        inputText={entryToEdit.text}
                        onEntrySubmit={handleEntrySubmit}
                        contestData={contestData}
                    />
                </div>
            </section>
        );
    }
}

EntryEdit.propTypes = {
    entryToEdit: PropTypes.object,
    handleEntrySubmit: PropTypes.func,
    contestData: PropTypes.object
};

export default EntryEdit;
