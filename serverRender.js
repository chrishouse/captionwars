import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import config from "./config";
import axios from "axios";

// We need the contests and users api for every request, but we only need the single user api if the URL param contains a userId (for the profile page).
const getApiData = (userId = -1) => {
    return [
        axios.get(`${config.serverUrl}/api/users`),
        axios.get(`${config.serverUrl}/api/users/${userId}`),
        axios.get(`${config.serverUrl}/api/contests`)
    ];
};

// This function returns the correct initial data depending on whether a userId exists in the URL params.
const getInitialUserData = (userId, apiUserData, apiSingleUserData) => {
    if (userId) {
        return {
            profileId: apiSingleUserData.userId,
            allUsers: apiUserData.users
        };
    }
    return {
        allUsers: apiUserData.users
    };
};

// This function returns the correct initial data depending on whether a contestId exists in the URL params.
const getInitialContestData = (contestId, apiContestData) => {
    !contestId ? (contestId = -1) : null;
    return {
        contests: apiContestData.contests,
        contestId: contestId
    };
};

const serverRender = (userId, contestId) => {
    contestId = Number(contestId);
    return axios
        .all(getApiData(userId))
        .then(resp => {
            const initialUserData = getInitialUserData(
                userId,
                resp[0].data,
                resp[1].data
            );
            const initialContestData = getInitialContestData(
                contestId,
                resp[2].data
            );
            return {
                // We return both the initial markup and the data itself from the AJAX call
                initialMarkup: ReactDOMServer.renderToString(
                    <App
                        initialContests={initialContestData}
                        initialUsers={initialUserData}
                    />
                ),
                initialContestData: initialContestData,
                initialUserData: initialUserData
            };
        })
        .catch(console.error);
};

export default serverRender;
