import React from "react";
import ContestSorter from "./ContestSorter";
import Contest from "./Contest";

const Main = props => {
    return (
        <main className="main">
            <ContestSorter />
            {/* to do: map through the contests here */}
            <Contest contestData={props.contestData} />
        </main>
    );
};

export default Main;
