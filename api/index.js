import express from "express";
import contestData from "../src/test-data/contests";
import userData from "../src/test-data/users";

const router = express.Router();

router.get("/contests", (req, res) => {
    res.send({ contests: contestData });
});

router.get("/users", (req, res) => {
    res.send({ users: userData });
});

export default router;
