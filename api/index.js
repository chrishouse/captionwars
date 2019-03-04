import express from "express";
import contestData from "../src/test-data/contests";
import userData from "../src/test-data/users";

const router = express.Router();

// Convert the data arrays into objects for effeciency
const users = userData.reduce((obj, user) => {
    obj[user.userId] = user;
    return obj;
}, {});

const contests = contestData.reduce((obj, contest) => {
    obj[contest.contestId] = contest;
    return obj;
}, {});

router.get("/contests", (req, res) => {
    res.send({
        contests: contests
    });
});

router.get("/contests/:contestId", (req, res) => {
    let contest = contests[req.params.contestId];
    res.send(contest);
});

router.get("/users", (req, res) => {
    res.send({
        users: users
    });
});

router.get("/users/:userId", (req, res) => {
    let user = users[req.params.userId];
    res.send(user);
});

export default router;
