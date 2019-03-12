import axios from "axios";

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`).then(resp => resp.data);
};

export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`).then(resp => resp.data);
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

export const updateEntryLikes = (_id, likes) => {
    return axios
        .put("/api/entries/updatelikes", {
            _id,
            likes
        })
        .then(resp => {
            resp.data;
        });
};

export const updateUserLikes = (_id, entryId) => {
    return axios
        .put("/api/users/updatelikes", {
            _id,
            entryId
        })
        .then(resp => {
            resp.data;
        });
};
