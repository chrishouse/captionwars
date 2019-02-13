import React from "react";
import UserAvatar from "./UserAvatar";
import PropTypes from "prop-types";
import userData from "../test-data/users";

const Entry = props => {
    return (
        <div className="entry">
            <p>{props.entry.text}</p>
            <p>{props.entry.date}</p>
            <section className="entry-info">
                <UserAvatar
                    user={props.entry.user}
                    likesReceived={userData[props.entry.user].likesReceived}
                />
                <p>Likes: {props.entry.likes}</p>
                {/* {console.log(userData[props.entry.user].likesReceived)} */}
            </section>
        </div>
    );
};

Entry.propTypes = {
    contestEntry: PropTypes.array
};

export default Entry;
