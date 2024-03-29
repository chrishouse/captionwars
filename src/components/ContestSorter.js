import React from "react";
import PropTypes from "prop-types";

const ContestSorter = ({
    radioChecked,
    followingFilter,
    onFollowingChange,
    onRadioChange,
    isAuthenticated
}) => {
    const handleRadioChange = e => {
        onRadioChange(e.target.id);
    };

    return (
        <section className="contest-sorter">
            <div className="contest-sort-radios">
                <input
                    type="radio"
                    id="newest-first"
                    name="contest-sort-radios"
                    onChange={handleRadioChange}
                    checked={radioChecked === "newest-first" ? true : false}
                />
                <label htmlFor="newest-first">Newest first</label>
                <input
                    type="radio"
                    id="oldest-first"
                    name="contest-sort-radios"
                    onChange={handleRadioChange}
                    checked={radioChecked === "oldest-first" ? true : false}
                />
                <label htmlFor="oldest-first">Oldest first</label>
                <input
                    type="radio"
                    id="popular-first"
                    name="contest-sort-radios"
                    onChange={handleRadioChange}
                    checked={radioChecked === "popular-first" ? true : false}
                />
                <label htmlFor="popular-first">Most popular first</label>
            </div>
            {isAuthenticated ? (
                <div className="contest-sort-checkbox">
                    <input
                        id="only-following"
                        type="checkbox"
                        checked={followingFilter}
                        onChange={onFollowingChange}
                    />
                    <label htmlFor="only-following">
                        Only show contests I&#39;m following
                    </label>
                </div>
            ) : null}
        </section>
    );
};

ContestSorter.propTypes = {
    radioChecked: PropTypes.string,
    followingFilter: PropTypes.bool,
    onFollowingChange: PropTypes.func,
    onRadioChange: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default ContestSorter;
