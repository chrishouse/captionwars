import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    mdb = client.db("test");
});

const router = express.Router();

// Register a new user
router.post("/", (req, res) => {
    const { userName, email, password } = req.body;

    // Simple validation
    if (!userName || !email || !password) {
        return res.status(400).json({ msg: "Please enter all the fields" });
    }

    // Check for existing user
    mdb.collection("users")
        .findOne({ $or: [{ userName }, { email }] })
        .then(user => {
            if (user && user.userName === userName)
                return res
                    .status(400)
                    .json({ msg: "That username is already in use" });
            if (user && user.email === email)
                return res
                    .status(400)
                    .json({ msg: "That email is already in use" });

            const newUser = {
                userName,
                password,
                email,
                likesReceived: [],
                likesGiven: [],
                contestsEntered: [],
                contestsFollowing: [],
                avatar: "no-avatar.png"
            };

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    mdb.collection("users")
                        .insertOne(newUser)
                        .then(resp => {
                            let user = resp.ops[0];
                            // Here's where the token is created. The .sign method takes four arguments: the payload (in JSON format), the secret, an option expiresIn, and the callback (which takes an error and the token)
                            jwt.sign(
                                { id: user._id },
                                config.jwtSecret,
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            userName: user.userName,
                                            email: user.email
                                        }
                                    });
                                }
                            );
                        });
                });
            });
        });
});

export default router;
