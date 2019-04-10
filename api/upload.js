import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import assert from "assert";
import config from "../config";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth";
import fileUpload from "express-fileupload";

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    mdb = client.db("test");
});

const router = express.Router();

// Upload an avatar
router.post("/", auth, (req, res) => {
    let { avatar } = req.body;
    const _id = ObjectID(req.user.id);
    mdb.collection("users")
        .findOne({
            // This gets the id from the token itself (passed in through auth)
            _id: ObjectID(req.user.id)
        })
        .then(() => {
            if (fieldToUpdate === "userName") {
                // Check if userName already exists
                mdb.collection("users")
                    .findOne({ userName: newValue })
                    .then(user => {
                        if (user)
                            return res.status(400).json({
                                msg: "That username is already in use"
                            });
                        mdb.collection("users")
                            .update(
                                { _id: ObjectID(_id) },
                                { $set: { userName: newValue } }
                            )
                            .then(() => res.send());
                    });
            } else if (fieldToUpdate === "email") {
                // Check if email already exists
                mdb.collection("users")
                    .findOne({ email: newValue })
                    .then(user => {
                        if (user)
                            return res
                                .status(400)
                                .json({ msg: "That email is already in use" });
                        mdb.collection("users")
                            .update(
                                { _id: ObjectID(_id) },
                                { $set: { email: newValue } }
                            )
                            .then(() => res.send());
                    });
            } else {
                if (fieldToUpdate === "password") {
                    // Create salt & hash
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newValue, salt, (err, hash) => {
                            if (err) throw err;
                            newValue = hash;
                        });
                    });
                }

                mdb.collection("users")
                    .update(
                        { _id: ObjectID(_id) },
                        { $set: { [fieldToUpdate]: newValue } }
                    )
                    .then(() => res.send());
            }
        });
});

export default router;
