import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import config from "./config";
import axios from "axios";

// We need the contests and users api for every request, but we only need the single user api if the URL param contains a userId (for the profile page).
const getApiData = userId => {
    if (userId) {
        return [
            axios.get(`${config.serverUrl}/api/contests`),
            axios.get(`${config.serverUrl}/api/users`),
            axios.get(`${config.serverUrl}/api/users/${userId}`)
        ];
    }
    return [
        axios.get(`${config.serverUrl}/api/contests`),
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
    !contestId ? (contestId = "-1") : null;
    return {
        contests: apiContestData.contests,
        singleContestId: String(contestId)
    };
};

const serverRender = (userId, contestId) => {
    return axios
        .all(getApiData(userId))
        .then(resp => {
            const initialUserData = getInitialUserData(
                userId,
                resp[1].data,
                userId ? resp[2].data : null
            );
            const initialContestData = getInitialContestData(
                contestId,
                resp[0].data
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
