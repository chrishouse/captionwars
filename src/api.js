import axios from "axios";

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`).then(resp => resp.data);
};

export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`).then(resp => resp.data);
};

export const fetchAllEntries = () => {
    return axios.get(`/api/entries/`).then(resp => resp.data.entries);
};

export const fetchEntries = contestId => {
    return axios
        .get(`/api/entries/contest/${contestId}`)
        .then(resp => resp.data);
};

export const addEntry = (contestId, text, likes, user, date) => {
    return axios
        .post("/api/entries", {
            contestId,
            text,
            likes,
            user,
            date
        })
        .then(resp => {
            resp.data;
        });
};

export const updateUserLikes = (userReceiving, userGiving, entryId, likes) => {
    return axios.put("/api/users/updatelikes", {
        userReceiving,
        userGiving,
        entryId,
        likes
    });
};

export const updateEntryText = (entryId, text, currentUser) => {
    return axios
        .put("/api/entries/updatetext", {
            entryId,
            text,
            currentUser
        })
        .then(resp => {
            resp.data;
        });
};

export const deleteEntry = (entryId, currentUser) => {
    return axios
        .delete("/api/entries/deleteentry", {
            data: { entryId: entryId, currentUser }
        })
        .then(resp => {
            resp.data;
        });
};

// TO DO: This function probably needs to be consolidated with the addEntry function somehow

export const updateContestsEntered = (userId, contestId, remove) => {
    if (remove) {
        return axios
            .delete("/api/users/deletecontestentered", {
                data: {
                    userId,
                    contestId
                }
            })
            .then(resp => {
                resp.data;
            });
    } else {
        return axios
            .put("/api/users/addcontestentered", {
                userId,
                contestId
            })
            .then(resp => {
                resp.data;
            });
    }
};

export const updateCurrentWinningEntries = (
    oldWinner,
    newWinner,
    oldUser,
    newUser
) => {
    return axios
        .put("/api/users/updatescurrentwinningentries", {
            oldWinner,
            newWinner,
            oldUser,
            newUser
        })
        .then(resp => {
            resp.data;
        });
};
