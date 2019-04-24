import React from "react";
import Stats from "./Stats";
import Leaderboard from "./Leaderboard";
import PropTypes from "prop-types";

class Sidebar extends React.Component {
    state = {
        isMobile: false,
        mobileSidebarExpanded: false
    };

    sidebar;

    componentDidMount = () => {
        this.sidebar = document.querySelector(".sidebar");
        this.checkWidth();
        window.addEventListener("resize", this.checkWidth);
    };

    checkWidth = () => {
        if (window.matchMedia("(max-width: 950px)").matches) {
            this.setState({
                isMobile: true
            });
            this.setMobileSidebar();
        } else {
            this.setState({
                isMobile: false
            });
        }
    };

    setMobileSidebar = () => {
        this.sidebar.style.left = "-300px";

        // Wait a few seconds for the elements to load and check the width of the sidebar again
        setTimeout(() => {
            const sidebarWidth = document.querySelector(".sidebar").offsetWidth;
            this.sidebar.style.left = `-${sidebarWidth}px`;
        }, 3000);
    };

    handleChevronClick = () => {
        if (this.state.mobileSidebarExpanded) {
            this.sidebar.classList.remove("sidebar-expanded");
            this.setState({
                mobileSidebarExpanded: false
            });
            this.setMobileSidebar();
        } else {
            const topPosition = document.querySelector("body").scrollTop;
            this.sidebar.classList.add("sidebar-expanded");
            this.sidebar.style.top = topPosition + 20 + "px";
            this.setState({
                mobileSidebarExpanded: true
            });
        }
    };

    render() {
        const {
            userData,
            currentUser,
            onAvatarClick,
            isAuthenticated
        } = this.props;
        const { isMobile, mobileSidebarExpanded } = this.state;
        return (
            <React.Fragment>
                {mobileSidebarExpanded ? (
                    <div
                        className="mobile-sidebar-overlay overlay"
                        onClick={this.handleChevronClick}
                    />
                ) : null}
                <i
                    className={
                        "fas fa-chevron-right sidebar-chevron" +
                        (isMobile ? " visible" : "") +
                        (mobileSidebarExpanded ? " active" : "")
                    }
                    onClick={this.handleChevronClick}
                />
                <aside
                    className={"sidebar" + (isMobile ? " sidebar-mobile" : "")}
                >
                    {isAuthenticated ? (
                        <Stats userData={userData} currentUser={currentUser} />
                    ) : null}
                    <Leaderboard
                        userData={userData}
                        currentUser={currentUser}
                        onAvatarClick={onAvatarClick}
                    />
                </aside>
            </React.Fragment>
        );
    }
}

Sidebar.propTypes = {
    userData: PropTypes.object,
    currentUser: PropTypes.string,
    onAvatarClick: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default Sidebar;
