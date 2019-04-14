import apiRouter from "./api/index";
import registerRouter from "./api/register";
import loginRouter from "./api/login";
import editRouter from "./api/edit";
import config from "./config";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import MongoClient from "mongodb";
import assert from "assert";
import auth from "./middleware/auth";

const fileUpload = require("express-fileupload");
const sharp = require("sharp");
const exec = require("child_process").exec;
const fs = require("fs");
const schedule = require("node-schedule");

// Prevent sharp cache from messing things up
sharp.cache(false);

const server = express();
server.use(bodyParser.json());
server.use(
    fileUpload({
        limits: { fileSize: 10000000 } //10MB
    })
);

// Use the SASS middleware
server.use(
    sassMiddleware({
        src: path.join(__dirname, "src/sass"),
        dest: path.join(__dirname, "public")
    })
);

// This sets the view engine to be EJS, a useful JS templating language. Express looks for .ejs files inside the views directory
server.set("view engine", "ejs");

// Get the API call from serverRender so we can get the data for a server render
import serverRender from "./serverRender";

// The express router - the first argument is the path, the second is event handlers (which receives both request and response objects)
server.get(
    ["/", "/profile/:userId", "/contest/:contestId", "/account"],
    (req, res) => {
        serverRender(req.params.userId, req.params.contestId, req.path) // Call the serverRender function from serverRender.js
            .then(
                ({
                    initialMarkup,
                    initialContestData,
                    initialEntriesData,
                    initialUserData,
                    accountPage
                }) => {
                    res.render("index", {
                        initialMarkup, // Render the content returned from the promise
                        initialContestData, // Render the data returned from the promise
                        initialEntriesData,
                        initialUserData,
                        accountPage
                    }); // .render looks for a .ejs file within the views directory. Second argument is an object to pass variables into the .ejs template file
                }
            )
            .catch(error => {
                console.error(error);
                res.status(404).send("Bad Request");
            });
    }
);

// Upload the avatar using express-fileupload
server.post("/api/upload", auth, (req, res) => {
    const user = req.body.user;
    const mime = req.files.avatar.mimetype;

    if (mime.indexOf("image") === -1) {
        return res.status(400).json({
            msg: "Either that's not a valid image file or it's too large"
        });
    }

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
    }

    let avatar = req.files.avatar;

    // Use the mv() method to place the file in the correct directory
    avatar.mv(`src/images/users/${user}-temp.jpg`, function(err) {
        if (err) return res.status(500).send(err);

        // Then resize the image with sharp
        sharp(`src/images/users/${user}-temp.jpg`)
            .resize(125, 125)
            .toFile(`src/images/users/${user}.jpg`, err => {
                if (err) {
                    fs.unlink(`src/images/users/${user}-temp.jpg`, () => {});
                    return res.status(400).json({
                        msg:
                            "Either that's not a valid image file or it's too large"
                    });
                }
                // Then delete the temp file
                fs.unlink(`src/images/users/${user}-temp.jpg`, () => {
                    // Then move the new image to the public/images directory
                    fs.rename(
                        `src/images/users/${user}.jpg`,
                        `public/images/users/${user}.jpg`,
                        function(err) {
                            if (err) {
                                return res.status(500).send(err);
                            } else {
                                return res.send();
                            }
                        }
                    );
                });
            });
    });
});

// Express has a middleware for serving static assets (.use is how we add middleware to the express middleware stack). The argument to .static is the directory.
server.use(express.static("public"));

// Again, only this time using our imported express router
server.use("/api", apiRouter);
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/edit", editRouter);

// The express listen call - the first two arguments are the port and host, the third argument is the success handler
server.listen(config.port, config.host, () => {
    console.log(`Express is listening on port ${config.port}`);
});

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);

    let mdb = client.db("test");

    const insertNewContest = () => {
        mdb.collection("contests")
            // Insert a new contest
            .insertOne({
                date: new Date().toISOString()
            })
            .then(() => {
                mdb.collection("contests")
                    // Find the newest item in the collection (the one we just inserted)
                    .findOne({}, { sort: { $natural: -1 } })
                    .then(item => {
                        // Get all the files in the images directory
                        const imageList = fs.readdirSync(
                            "src/images/contests/"
                        );
                        // Grab the first file in the directory
                        const imageToRename = imageList[0];
                        const firstLetter = imageToRename[0];

                        // Ensure the image to rename starts with an exclamation point (we don't want to rename anything else)
                        if (firstLetter === "!") {
                            // Then change its filename to the id of the newly created contest
                            fs.rename(
                                "src/images/contests/" + imageToRename,
                                "src/images/contests/" + item._id + ".jpg",
                                function(err) {
                                    if (err) console.log("ERROR: " + err);
                                }
                            );

                            // Run webkit to execute imagemin and move the new image to the public/images directory
                            exec("npm run prod", function(err, stdout) {
                                if (err) {
                                    throw err;
                                }
                                console.log(
                                    "New contest inserted with _id: " + item._id
                                );
                            });
                        }
                    });
            });
    };

    // Our insertNewContest function will run every Wednesday at 6:00am
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [3];
    rule.hour = 6;
    rule.minute = 0;

    const j = schedule.scheduleJob(rule, function() {
        insertNewContest();
    });
});
