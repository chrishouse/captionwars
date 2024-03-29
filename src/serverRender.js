import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./components/App";

import config from "./config";
import axios from "axios";

// We need the contests and users api for every request, but we only need the single user api if the URL param contains a userId (for the profile page).
const getApiData = userId => {
    if (userId) {
        return [
            axios.get(`${config.serverUrl}/api/contests`),
            axios.get(`${config.serverUrl}/api/entries`),
            axios.get(`${config.serverUrl}/api/users`),
            axios.get(`${config.serverUrl}/api/users/${userId}`)
        ];
    }
    return [
        axios.get(`${config.serverUrl}/api/contests`),
        axios.get(`${config.serverUrl}/api/entries`),
        axios.get(`${config.serverUrl}/api/users`)
    ];
};

// This function returns the correct initial data depending on whether a userId exists in the URL params.
const getInitialUserData = (userId, apiUserData, apiSingleUserData) => {
    if (userId) {
        return {
            profileId: String(apiSingleUserData._id),
            allUsers: apiUserData.users
        };
    }
    return {
        allUsers: apiUserData.users
    };
};

// This function returns the correct initial data depending on whether a contestId exists in the URL params.
const getInitialContestData = (contestId, apiContestData) => {
    if (contestId) {
        return {
            contests: apiContestData.contests,
            singleContestId: String(contestId)
        };
    }
    return {
        contests: apiContestData.contests
    };
};

// Get the initial entries data
const getInitialEntriesData = apiEntriesData => {
    return {
        entries: apiEntriesData.entries
    };
};

const serverRender = (userId, contestId, path) => {
    return axios
        .all(getApiData(userId))
        .then(resp => {
            const initialUserData = getInitialUserData(
                userId,
                resp[2].data,
                userId ? resp[3].data : null
            );
            const initialContestData = getInitialContestData(
                contestId,
                resp[0].data
            );
            const initialEntriesData = getInitialEntriesData(resp[1].data);
            let ogImageUrl = "https://captionwars.com/images/assets/oglogo.png";
            let ogUrl = "https://captionwars.com";
            if (contestId) {
                ogImageUrl = `https://captionwars.com/images/contests/${contestId}.jpg`;
                ogUrl = `https://captionwars.com/contest/${contestId}/`;
            }
            let accountPage = false;
            if (path === "/account") {
                accountPage = true;
            }
            return {
                // We return both the initial markup and the data itself from the AJAX call
                initialMarkup: ReactDOMServer.renderToString(
                    <App
                        initialContests={initialContestData}
                        initialUsers={initialUserData}
                        initialEntries={initialEntriesData}
                        accountPage={accountPage}
                    />
                ),
                initialContestData: initialContestData,
                initialUserData: initialUserData,
                initialEntriesData: initialEntriesData,
                accountPage: accountPage,
                ogImageUrl: ogImageUrl,
                ogUrl: ogUrl
            };
        })
        .catch(console.error);
};

export default serverRender;
