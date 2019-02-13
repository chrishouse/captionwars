import React from "react";

const ContestPhoto = props => {
    return (
        <section className="contest-photo">
            <img
                src={`/images/contests/${props.contestData[0].contestId}.jpg`}
            />
        </section>
    );
};

export default ContestPhoto;
