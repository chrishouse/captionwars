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
            users[user._id] = user;
        });
});

router.get("/users/:userId", (req, res) => {
    mdb.collection("users")
        .findOne({
            _id: ObjectID(req.params.userId)
        })
        .then(user => res.send(user))
        .catch(console.error);
});

router.get("/entries", (req, res) => {
    let entries = {};
    mdb.collection("entries")
        .find({})
        .each((err, entry) => {
            assert.equal(null, err);
            if (!entry) {
                res.send({ entries });
                return;
            }
            entries[entry._id] = entry;
        });
});

router.get("/entries/:entryId", (req, res) => {
    mdb.collection("entries")
        .findOne({
            _id: ObjectID(req.params.entryId)
        })
        .then(entry => res.send(entry))
        .catch(console.error);
});

router.post("/contests", (req, res) => {
    console.log(req.body);
});

export default router;
