import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    mdb = client.db("captionwars");
});

const router = express.Router();

// Authenticate a user
router.post("/", (req, res) => {
    const { userName, password } = req.body;

    // Simple validation
    if (!userName || !password) {
        return res.status(400).json({ msg: "Please enter both fields." });
    }

    // Check for existing user
    mdb.collection("users")
        .findOne({
            userName
        })
        .then(user => {
            if (!user)
                return res.status(400).json({
                    msg:
                        "We can't find a user with that name. Please try again."
                });

            // Validate password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch)
                    return res.status(400).json({
                        msg: "Incorrect password. Please try again."
                    });

                jwt.sign({ id: user._id }, config.jwtSecret, (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user._id,
                            realName: user.realName,
                            userName: user.userName,
                            email: user.email,
                            gender: user.gender,
                            age: user.age,
                            avatar: user.avatar,
                            website: user.website,
                            location: user.location,
                            facebook: user.facebook,
                            twitter: user.twitter,
                            instagram: user.instagram,
                            pinterest: user.pinterest,
                            linkedin: user.linkedin,
                            youtube: user.youtube
                        }
                    });
                });
            });
        });
});

export default router;
