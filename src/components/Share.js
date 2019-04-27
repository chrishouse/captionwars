import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon
} from "react-share";
import PropTypes from "prop-types";

class Share extends React.Component {
    state = {};

    handleCancelClick = () => {
        this.props.handleCancelClick();
    };

    render() {
        const { contestData } = this.props;
        return (
            <div className="overlay">
                <div className="dialog share-dialog">
                    <i
                        className="fas fa-times"
                        onClick={this.handleCancelClick}
                    />
                    <div className="share-dialog-buttons">
                        <span>Share this contest:</span>

                        <FacebookShareButton
                            onShareWindowClose={this.handleCancelClick}
                            url={`https://captionwars.com/contest/${
                                contestData._id
                            }`}
                            quote={`Caption Wars contest for ${new Date(
                                contestData.date
                            ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}`}
                        >
                            <FacebookIcon size={35} />
                        </FacebookShareButton>
                        <TwitterShareButton
                            onShareWindowClose={this.handleCancelClick}
                            url={`https://captionwars.com/contest/${
                                contestData._id
                            }`}
                        >
                            <TwitterIcon size={35} />
                        </TwitterShareButton>
                        <LinkedinShareButton
                            onShareWindowClose={this.handleCancelClick}
                            url={`https://captionwars.com/contest/${
                                contestData._id
                            }`}
                        >
                            <LinkedinIcon size={35} />
                        </LinkedinShareButton>
                        <PinterestShareButton
                            onShareWindowClose={this.handleCancelClick}
                            url={`https://captionwars.com/contest/${
                                contestData._id
                            }`}
                            media={`https://captionwars.com/images/contests/${
                                contestData._id
                            }.jpg`}
                        >
                            <PinterestIcon size={35} />
                        </PinterestShareButton>
                    </div>
                </div>
            </div>
        );
    }
}

Share.propTypes = {
    contestData: PropTypes.object.isRequired,
    handleCancelClick: PropTypes.func.isRequired
};

export default Share;
