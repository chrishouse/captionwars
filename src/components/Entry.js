import React from "react";
import UserAvatar from "./UserAvatar";
import EntryInput from "./EntryInput";
import EditConfirm from "./EditConfirm";
import PropTypes from "prop-types";
import userData from "../test-data/users";

class Entry extends React.Component {
    state = {
        editMode: false,
        editConfirmed: false
    };

    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    componentDidUpdate = prevProps => {
        if (prevProps.entryNumber !== this.props.entryNumber) {
            // TO DO: Styling here, somehow
        }
    };

    handleShowEditor = () => {
        this.setState({
            editMode: true
        });
    };

    handleCancelClick = () => {
        this.setState({
            editMode: false
        });
    };

    render() {
        const {
            isWinner,
            entryNumber,
            contest,
            entry,
            currentUser,
            handleEntryEditSave
        } = this.props;

        const { editMode, editConfirmed } = this.state;

        return (
            <React.Fragment>
                <div
                    className={
                        "entry" +
                        (isWinner ? " winner" : "") +
                        (editMode ? " entry-hidden" : "")
                    }
                >
                    <div className="entry-number">
                        {isWinner ? <i className="fas fa-trophy" /> : ""}
                        {entryNumber}
                    </div>
                    <p className="entry-text">{entry.text}</p>

                    <section className="entry-info">
                        <p className="entry-date">
                            {new Date(entry.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </p>
                        {userData[entry.user].userId === currentUser ? (
                            <div className="user-edit-buttons">
                                <a
                                    className="entry-edit"
                                    onClick={this.handleShowEditor}
                                >
                                    Edit
                                </a>
                                <a className="entry-delete">Delete</a>
                            </div>
                        ) : null}
                        <div className="entry-user-likes">
                            <a
                                className="entry-like-button"
                                onClick={() =>
                                    this.props.onLikeClick(contest, entry)
                                }
                            >
                                <i className="far fa-thumbs-up" />
                                <p className="entry-likes">
                                    {this.numberWithCommas(entry.likes)}
                                </p>
                            </a>
                            <p className="entry-user-name">
                                {userData[entry.user].userName}
                            </p>
                            <UserAvatar
                                user={entry.user}
                                currentUser={currentUser}
                                likesReceived={
                                    userData[entry.user].likesReceived
                                }
                                currentWinners={
                                    userData[entry.user].currentWinners
                                }
                            />
                        </div>
                    </section>
                </div>

                {editMode ? (
                    // TO DO: Create confirmation dialog and show it until editConfirmed is false
                    !editConfirmed ? (
                        <EditConfirm />
                    ) : (
                        <EntryInput
                            editMode={editMode}
                            handleCancelClick={this.handleCancelClick}
                            entryText={entry.text}
                            contestData={contest}
                            entryData={entry}
                            handleEntryEditSave={handleEntryEditSave}
                        />
                    )
                ) : (
                    ""
                )}
            </React.Fragment>
        );
    }
}

Entry.propTypes = {
    contestEntry: PropTypes.array,
    entry: PropTypes.object,
    isWinner: PropTypes.bool,
    entryNumber: PropTypes.number,
    contest: PropTypes.object,
    currentUser: PropTypes.number,
    onLikeClick: PropTypes.func,
    handleEntryEditSave: PropTypes.func
};

export default Entry;
