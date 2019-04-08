import React from "react";
import UserAvatar from "./UserAvatar";
import EntryInput from "./EntryInput";
import EditConfirm from "./EditConfirm";
import DeleteConfirm from "./DeleteConfirm";
import PropTypes from "prop-types";

class Entry extends React.Component {
    state = {
        editMode: false,
        editConfirmed: false,
        likedByCurrentUser: false,
        entryNote: false,
        deleteConfirm: false,
        isEntering: true,
        likeJustClicked: false,
        likeError: null
    };

    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    checkIfLikedByCurrentUser = () => {
        // If the current user has liked this entry, set the state of likedByCurrentUser to true
        const currentUserLikesGiven = this.props.userData[
            this.props.currentUser
        ].likesGiven;

        if (currentUserLikesGiven.includes(this.props.entry._id)) {
            this.setState({
                likedByCurrentUser: true
            });
        } else {
            this.setState({
                likedByCurrentUser: false
            });
        }
    };

    componentDidMount() {
        this.checkIfLikedByCurrentUser();
        setTimeout(() => {
            this.setState({
                isEntering: false
            });
        }, 0);
    }

    componentDidUpdate = prevProps => {
        if (prevProps.entry !== this.props.entry) {
            this.checkIfLikedByCurrentUser();
        }
    };

    handleLikeClick = () => {
        if (this.props.isAuthenticated) {
            if (this.props.entry.user === this.props.currentUser) {
                this.setState({
                    entryNote: true
                });
                setTimeout(() => {
                    this.setState({
                        entryNote: false
                    });
                }, 4000);
            } else {
                this.props.onLikeClick(
                    this.props.entry,
                    this.state.likedByCurrentUser
                );

                this.setState(prevState => ({
                    likedByCurrentUser: !prevState.likedByCurrentUser
                }));

                if (this.state.likedByCurrentUser === false) {
                    this.setState({
                        likeJustClicked: true
                    });

                    setTimeout(() => {
                        this.setState({
                            likeJustClicked: false
                        });
                    }, 400);
                }
            }
        } else {
            this.setState({
                likeError: true
            });
            setTimeout(() => {
                this.setState({
                    likeError: false
                });
            }, 4000);
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
            editConfirmed: false,
            deleteConfirm: false
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

    handleShowDeleteConfirm = () => {
        this.setState({ deleteConfirm: true });
    };

    handleDeleteImSure = () => {
        this.props.handleDeleteImSure(this.props.entry._id);
        this.setState({ deleteConfirm: false });
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
            onAvatarClick,
            isAuthenticated
        } = this.props;

        const {
            editMode,
            editConfirmed,
            likedByCurrentUser,
            entryNote,
            deleteConfirm,
            isEntering,
            likeJustClicked,
            likeError
        } = this.state;

        return (
            <React.Fragment>
                <div
                    className={
                        "entry" +
                        (isWinner ? " winner" : "") +
                        (editMode ? " entry-hidden" : "") +
                        (isEntering ? " entering" : "")
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
                                <a
                                    className="entry-delete"
                                    onClick={this.handleShowDeleteConfirm}
                                >
                                    Delete
                                </a>
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
                                <i
                                    className={
                                        "far fa-thumbs-up" +
                                        (likeJustClicked ? " just-clicked" : "")
                                    }
                                />
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
                                    userData[entry.user].likesReceived
                                }
                                avatar={userData[entry.user].avatar}
                                onAvatarClick={onAvatarClick}
                            />
                            <div
                                className={
                                    "entry-note" + (entryNote ? " visible" : "")
                                }
                            >
                                <p>You can&#39;t like your own entry.</p>
                            </div>
                            <div
                                className={
                                    "like-error" + (likeError ? " visible" : "")
                                }
                            >
                                You must be logged in to like an entry.
                            </div>
                        </div>
                    </section>
                </div>

                {deleteConfirm ? (
                    <DeleteConfirm
                        handleDeleteNeverMind={this.handleCancelClick}
                        handleDeleteImSure={this.handleDeleteImSure}
                    />
                ) : null}

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
                            isAuthenticated={isAuthenticated}
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
    onAvatarClick: PropTypes.func,
    handleDeleteImSure: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default Entry;
