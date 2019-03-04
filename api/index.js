import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import assert from "assert";
import config from "../config";

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    mdb = client.db("test");
});

const router = express.Router();

router.get("/contests", (req, res) => {
    let contests = {};
    mdb.collection("contests")
        .find({})
        .each((err, contest) => {
            assert.equal(null, err);
            if (!contest) {
                res.send({ contests });
                return;
            }
            contests[contest._id] = contest;
        });
});

router.get("/contests/:contestId", (req, res) => {
    mdb.collection("contests")
        .findOne({
            _id: ObjectID(req.params.contestId)
        })
        .then(contest => res.send(contest))
        .catch(console.error);
});

router.get("/users", (req, res) => {
    let users = {};
    mdb.collection("users")
        .find({})
        .each((err, user) => {
            assert.equal(null, err);
            if (!user) {
                res.send({ users });
                return;
            }
            users[user.userId] = user;
        });
});

router.get("/users/:userId", (req, res) => {
    mdb.collection("users")
        .findOne({
            userId: Number(req.params.userId)
        })
        .then(user => res.send(user))
        .catch(console.error);
});

export default router;
