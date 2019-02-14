import React from "react";
import UserAvatar from "./UserAvatar";
import PropTypes from "prop-types";
import userData from "../test-data/users";

const Entry = props => {
    const numberWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className={"entry" + (props.isWinner ? " winner" : "")}>
            <div className="entry-number">
                {props.isWinner ? <i className="fas fa-trophy" /> : ""}
                {props.entryNumber}
            </div>
            <p className="entry-text">{props.entry.text}</p>

            <section className="entry-info">
                <p className="entry-date">{props.entry.date}</p>
                <div className="entry-user-likes">
                    <a className="entry-like-button">
                        <i className="far fa-thumbs-up" />
                    </a>
                    <p className="entry-likes">
                        {numberWithCommas(props.entry.likes)}
                    </p>
                    <p className="entry-user-name">
                        {userData[props.entry.user].userName}
                    </p>
                    <UserAvatar
                        user={props.entry.user}
                        likesReceived={userData[props.entry.user].likesReceived}
                        currentWinners={
                            userData[props.entry.user].currentWinners
                        }
                    />
                </div>
            </section>
        </div>
    );
};

Entry.propTypes = {
    contestEntry: PropTypes.array,
    entry: PropTypes.object
};

export default Entry;
