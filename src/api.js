import axios from "axios";

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`).then(resp => resp.data);
};

export const fetchAllUsers = () => {
    return axios.get(`/api/users/`).then(resp => resp.data.users);
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

export const addEntry = (token, contestId, text, likes, user, date) => {
    return axios
        .post(
            "/api/entries",
            {
                contestId,
                text,
                likes,
                user,
                date
            },
            {
                headers: {
                    "x-auth-token": token
                }
            }
        )
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

export const updateContestsFollowing = (userId, contestId, remove) => {
    if (remove === true) {
        return axios
            .put("/api/users/deletecontestfollowing", {
                userId,
                contestId
            })
            .then(resp => {
                resp.data;
            });
    } else {
        return axios
            .put("/api/users/addcontestfollowing", {
                userId,
                contestId
            })
            .then(resp => {
                resp.data;
            });
    }
};

export const login = (userName, password) => {
    return axios
        .post("/api/login", {
            userName,
            password
        })
        .then(resp => {
            localStorage.setItem("token", resp.data.token);
            return resp;
        })
        .catch(err => {
            return err.response;
        });
};

export const register = (userName, password, email) => {
    return axios
        .post("/api/register", {
            userName,
            password,
            email
        })
        .then(resp => {
            localStorage.setItem("token", resp.data.token);
            return resp;
        })
        .catch(err => {
            return err.response;
        });
};

export const account = token => {
    return axios
        .get("/api/account", {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": token
            }
        })
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        });
};

export const edit = (token, fieldToUpdate, newValue) => {
    return axios
        .post(
            "/api/edit",
            { fieldToUpdate, newValue },
            {
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": token
                }
            }
        )
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err.response;
        });
};

export const avatarUpload = (token, formData) => {
    return axios
        .post("/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            }
        })
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err.response;
        });
};
