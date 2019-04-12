import React from "react";

class Contact extends React.Component {
    state = {
        visible: false
    };

    handleContactClick = () => {
        this.setState(prevState => ({
            visible: !prevState.visible
        }));
    };

    handleCancelClick = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <div className="header-contact">
                <i
                    className="far fa-envelope"
                    onClick={this.handleContactClick}
                />
                {this.state.visible ? (
                    <div className="overlay contact-modal">
                        <div className="dialog">
                            <i
                                className="fas fa-times"
                                onClick={this.handleCancelClick}
                            />
                            Concerns, questions or comments? Email us at{" "}
                            <a href="mailto:support@captionwars.com">
                                support@captionwars.com
                            </a>
                            .
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Contact;
