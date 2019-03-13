import React from "react";
import UserAvatar from "./UserAvatar";
import EntryInput from "./EntryInput";
import EditConfirm from "./EditConfirm";
import PropTypes from "prop-types";

class Entry extends React.Component {
    state = {
        editMode: false,
        editConfirmed: false,
        likedByCurrentUser: false,
        entryNote: false
    };

    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    componentDidMount() {
        // If the current user has liked this entry, set the state of likedByCurrentUser to true
        const currentUserLikesGiven = this.props.userData[
            this.props.currentUser
        ].likesGiven.filter(like => like === this.props.entry._id);

        if (currentUserLikesGiven.length > 0) {
            this.setState({
                likedByCurrentUser: true
            });
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.entryNumber !== this.props.entryNumber) {
            // TO DO: Styling here, somehow
        }
    };

    // There's an issue here. When clicking like pushed the entry to the winner spot, likedByCurrentUser state doesn't always persist
    handleLikeClick = () => {
        if (this.props.entry.user === this.props.currentUser) {
            this.setState({
                entryNote: true
            });
            setTimeout(() => {
                this.setState({
                    entryNote: false
                });
            }, 5000);
        } else {
            this.props.onLikeClick(
                this.props.entry,
                this.state.likedByCurrentUser
            );
            this.setState({
                likedByCurrentUser: !this.state.likedByCurrentUser
            });
        }
    };

    handleShowEditor = () => {
        this.setState({
            editMode: true
        });
    };

    handleCancelClick = () => {
        this.setState({
            editMode: false,
            editConfirmed: false
        });
    };

    handleImSure = () => {
        this.setState({
            editConfirmed: true
        });
    };

    handleNameClick = () => {
        this.props.onAvatarClick(this.props.entry.user);
    };

    static defaultProps = {
        entryText: ""
    };

    render() {
        const {
            isWinner,
            userData,
            entryNumber,
            contest,
            entry,
            currentUser,
            handleEntryEditSave,
            onAvatarClick
        } = this.props;

        const {
            editMode,
            editConfirmed,
            likedByCurrentUser,
            entryNote
        } = this.state;

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
                        {userData[entry.user]._id === currentUser ? (
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
                        <div
                            className={
                                "entry-user-likes" +
                                (likedByCurrentUser ? " liked" : "")
                            }
                        >
                            <a
                                className="entry-like-button"
                                onClick={this.handleLikeClick}
                            >
                                <i className="far fa-thumbs-up" />
                                <p className="entry-likes">
                                    {this.numberWithCommas(entry.likes)}
                                </p>
                            </a>
                            <p
                                className="entry-user-name"
                                onClick={this.handleNameClick}
                            >
                                {userData[entry.user].userName}
                            </p>
                            <UserAvatar
                                user={entry.user}
                                currentUser={currentUser}
                                likesReceived={
                                    userData[entry.user].likesReceived.length
                                }
                                currentWinners={
                                    userData[entry.user].currentWinningEntries
                                        .length
                                }
                                onAvatarClick={onAvatarClick}
                            />
                            <div
                                className={
                                    "entry-note" + (entryNote ? " visible" : "")
                                }
                            >
                                <p>You can&#39;t like your own entry, bucko.</p>
                            </div>
                        </div>
                    </section>
                </div>

                {editMode ? (
                    !editConfirmed ? (
                        <EditConfirm
                            handleNeverMind={this.handleCancelClick}
                            handleImSure={this.handleImSure}
                        />
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
    userData: PropTypes.object,
    entry: PropTypes.object,
    isWinner: PropTypes.bool,
    entryNumber: PropTypes.number,
    contest: PropTypes.object,
    currentUser: PropTypes.string,
    onLikeClick: PropTypes.func,
    handleEntryEditSave: PropTypes.func,
    onAvatarClick: PropTypes.func
};

export default Entry;
