import React from "react";
import UserAvatar from "./UserAvatar";
import PropTypes from "prop-types";
import userData from "../test-data/users";

class Entry extends React.Component {
    numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        const { isWinner, entryNumber, contest, entry } = this.props;
        return (
            <div className={"entry" + (isWinner ? " winner" : "")}>
                <div className="entry-number">
                    {isWinner ? <i className="fas fa-trophy" /> : ""}
                    {entryNumber}
                </div>
                <p className="entry-text">{entry.text}</p>

                <section className="entry-info">
                    <p className="entry-date">{entry.date}</p>
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
                            likesReceived={userData[entry.user].likesReceived}
                            currentWinners={userData[entry.user].currentWinners}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

Entry.propTypes = {
    contestEntry: PropTypes.array,
    entry: PropTypes.object
};

export default Entry;
