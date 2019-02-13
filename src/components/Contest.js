import React from "react";
import ContestDate from "./ContestDate";
import ContestPhoto from "./ContestPhoto";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import MoreEntriesBtn from "./MoreEntriesBtn";
import FollowContestBtn from "./FollowContestBtn";
import PropTypes from "prop-types";

const Contest = props => {
    return (
        <section className="contest">
            <ContestDate contestDate={props.contestData.date} />
            <ContestPhoto contestPhoto={props.contestData.contestId} />
            <Entry contestEntry={props.contestData.entries} />
            <EntrySorter />
            <MoreEntriesBtn />
            <FollowContestBtn />
            <EntryInput />
        </section>
    );
};

Contest.propTypes = {
    contestData: PropTypes.object
};

export default Contest;
