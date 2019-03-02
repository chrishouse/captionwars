import express from "express";
import contestData from "../src/test-data/contests";
import userData from "../src/test-data/users";

const router = express.Router();
// Convert the users array into an object for effeciency
const users = userData.reduce((obj, user) => {
    obj[user.userId] = user;
    return obj;
}, {});

router.get("/contests", (req, res) => {
    res.send({ contests: contestData });
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
