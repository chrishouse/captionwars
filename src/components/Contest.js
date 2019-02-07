import React from "react";
import ContestDate from "./ContestDate";
import ContestPhoto from "./ContestPhoto";
import Entry from "./Entry";
import EntrySorter from "./EntrySorter";
import EntryInput from "./EntryInput";
import MoreEntriesBtn from "./MoreEntriesBtn";
import FollowContestBtn from "./FollowContestBtn";

const Contest = () => {
    return (
        <section className="contest">
            <ContestDate />
            <ContestPhoto />
            <Entry />
            <EntrySorter />
            <MoreEntriesBtn />
            <FollowContestBtn />
            <EntryInput />
        </section>
    );
};

export default Contest;
