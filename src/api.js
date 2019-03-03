import axios from "axios";

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`).then(resp => resp.data);
};

export const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`).then(resp => resp.data);
};
