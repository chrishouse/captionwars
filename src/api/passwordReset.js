import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import assert from "assert";
import config from "../config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

let mdb;
MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    mdb = client.db("test");
});

const router = express.Router();

router.post("/", (req, res) => {
    if (req.body.email !== undefined) {
        const emailAddress = req.body.email;
        mdb.collection("users")
            .findOne({ email: emailAddress })
            .then(user => {
                const payload = {
                    id: user._id,
                    userName: user.userName,
                    email: emailAddress
                };

                const secret = user.password + "-" + config.jwtSecret;
                const token = jwt.sign(payload, secret);

                const url =
                    "http://localhost:8080/api/passwordreset/" +
                    payload.id +
                    "/" +
                    token;

                // Send email with url
                async function main() {
                    const transporter = nodemailer.createTransport({
                        host: "mail.chris.house",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: "me@chris.house",
                            pass: "zElda(090"
                        }
                    });

                    await transporter.sendMail({
                        from:
                            '"Caption Wars Support" <support@captionwars.com>', // sender address
                        to: payload.email, // list of receivers
                        subject: "Reset your password", // Subject line
                        text: `Hi. Your username is ${
                            payload.userName
                        }. You can reset your password with this URL: ${url}`, // plain text body
                        html:
                            "<p>Hi. Your username is " +
                            payload.userName +
                            ". You can reset your password with this URL: <a href='" +
                            url +
                            "'>Reset password</a></p>" // html body
                    });
                }

                main().catch(console.error);

                res.send();
            });
    } else {
        res.status(400).json({ msg: "Email address is required" });
    }
});

router.get("/:id/:token", (req, res) => {
    mdb.collection("users")
        .findOne({ _id: ObjectID(req.params.id) })
        .then(user => {
            const secret = user.password + "-" + config.jwtSecret;
            let payload;
            try {
                payload = jwt.verify(req.params.token, secret);
                res.send(
                    '<form action="/api/passwordreset/reset" method="POST">' +
                        '<input type="hidden" name="id" value="' +
                        payload.id +
                        '" />' +
                        '<input type="hidden" name="token" value="' +
                        req.params.token +
                        '" />' +
                        '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
                        '<input type="submit" value="Reset Password" />' +
                        "</form>"
                );
            } catch (e) {
                res.send("That link is no longer valid.");
            }
        });
});

router.post("/reset", (req, res) => {
    mdb.collection("users")
        .findOne({ _id: ObjectID(req.body.id) })
        .then(user => {
            const secret = user.password + "-" + config.jwtSecret;
            try {
                jwt.verify(req.body.token, secret);
                // Create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        mdb.collection("users")
                            .update(
                                { _id: ObjectID(req.body.id) },
                                { $set: { password: hash } }
                            )
                            .then(() =>
                                res.send(
                                    "Your password has been successfully changed.<br /><a href='/'>Return to the Caption Wars home page to log in.</a>"
                                )
                            );
                    });
                });
            } catch (e) {
                res.send("An error occurred.");
            }
        });
});

export default router;
