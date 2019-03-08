import config from "./config";
import apiRouter from "./api";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import express from "express";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.json());

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
server.get(["/", "/profile/:userId", "/contest/:contestId"], (req, res) => {
    serverRender(req.params.userId, req.params.contestId) // Call the serverRender function from serverRender.js
        .then(({ initialMarkup, initialContestData, initialUserData }) => {
            res.render("index", {
                initialMarkup, // Render the content returned from the promise
                initialContestData, // Render the data returned from the promise
                initialUserData
            }); // .render looks for a .ejs file within the views directory. Second argument is an object to pass variables into the .ejs template file
        })
        .catch(error => {
            console.error(error);
            res.status(404).send("Bad Request");
        });
});

// Express has a middleware for serving static assets (.use is how we add middleware to the express middleware stack). The argument to .static is the directory.
server.use(express.static("public"));

// Again, only this time using our imported express router
server.use("/api", apiRouter);

// The express listen call - the first two arguments are the port and host, the third argument is the success handler
server.listen(config.port, config.host, () => {
    console.log(`Express is listening on port ${config.port}`);
});
