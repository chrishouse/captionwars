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

// Endpoint to get a single entry based on an entry's _id
router.get("/entries/:entryId", (req, res) => {
    mdb.collection("entries")
        .findOne({
            _id: ObjectID(req.params.entryId)
        })
        .then(entry => res.send(entry))
        .catch(console.error);
});

// Endpoint to get all the entries of a given contestId
router.get("/entries/contest/:contestId", (req, res) => {
    let entries = {};
    mdb.collection("entries")
        .find({ contestId: req.params.contestId })
        .each((err, entry) => {
            assert.equal(null, err);
            if (!entry) {
                res.send(entries);
                return;
            }
            entries[entry._id] = entry;
        });
});

router.post("/entries", (req, res) => {
    const contestId = req.body.contestId;
    const text = req.body.text;
    const likes = req.body.likes;
    const user = req.body.user;
    const date = req.body.date;
    // Insert the new entry
    mdb.collection("entries")
        .insertOne({
            contestId,
            text,
            likes,
            user,
            date
        })
        .then(
            res.send({
                contestId,
                text,
                likes,
                user,
                date
            })
        );
});

router.put("/entries/updatelikes", (req, res) => {
    const _id = req.body._id;
    const likes = req.body.likes;
    // Update the entry
    mdb.collection("entries").updateOne(
        { _id: ObjectID(_id) },
        { $set: { likes } },
        function(err, results) {
            assert.equal(null, err);
            res.send(results.result);
        }
    );
});

router.put("/users/updatelikes", (req, res) => {
    const userReceiving = req.body.userReceiving;
    const userGiving = req.body.userGiving;
    const entryId = req.body.entryId;
    // Update the user's likesReceived
    mdb.collection("users").updateOne(
        { _id: ObjectID(userReceiving) },
        { $push: { likesReceived: entryId } },
        function(err) {
            assert.equal(null, err);
        }
    );
    // Update the giver user's likesGiven
    mdb.collection("users").updateOne(
        { _id: ObjectID(userGiving) },
        { $push: { likesGiven: entryId } },
        function(err, results) {
            assert.equal(null, err);
            res.send(results.result);
        }
    );
});

router.delete("/users/deletelikes", (req, res) => {
    const userReceiving = req.body.userReceiving;
    const userGiving = req.body.userGiving;
    const entryId = req.body.entryId;
    // Update the user's likesReceived
    mdb.collection("users").update(
        { _id: ObjectID(userReceiving) },
        { $pull: { likesReceived: entryId } },
        function(err) {
            assert.equal(null, err);
        }
    );
    // Update the giver user's likesGiven
    mdb.collection("users").update(
        { _id: ObjectID(userGiving) },
        { $pull: { likesGiven: entryId } },
        function(err, results) {
            assert.equal(null, err);
            res.send(results.result);
        }
    );
});

router.put("/entries/updatetext", (req, res) => {
    const _id = req.body.entryId;
    const text = req.body.text;
    // Update the entry
    mdb.collection("entries").updateOne(
        { _id: ObjectID(_id) },
        { $set: { text, likes: 0 } },
        function(err, results) {
            assert.equal(null, err);
            res.send(results.result);
        }
    );
});

router.delete("/entries/deleteentry", (req, res) => {
    const entryId = req.body.entryId;
    // Delete the entry
    mdb.collection("entries").remove({ _id: ObjectID(entryId) }, function(
        err,
        results
    ) {
        assert.equal(null, err);
        res.send(results.result);
    });
});

export default router;
