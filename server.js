import config from "./config";
import apiRouter from "./api";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import express from "express";

const server = express();

// Use the SASS middleware
server.use(
    sassMiddleware({
        src: path.join(__dirname, "src/sass"),
        dest: path.join(__dirname, "/styles")
    })
);

// This sets the view engine to be EJS, a useful JS templating language. Express looks for .ejs files inside the views directory
server.set("view engine", "ejs");

// The express router - the first argument is the path, the second is event handlers (which receives both request and response objects)
server.get("/", (req, res) => {
    res.render("index", {
        content:
            "<div class='loading-screen'><p class='loading-message'>Loading...</p></div>"
    }); // .render looks for a .ejs file within the views directory. Second argument is an object to pass variables into the .ejs template file
});

// Express has a middleware for serving static assets (.use is how we add middleware to the express middleware stack). The argument to .static is the directory.
server.use(express.static("public"));

// Again, only this time using our imported express router
server.use("/api", apiRouter);

// The express listen call - the first argument is the port, second argument is the success handler
server.listen(config.port, () => {
    console.log(`Express is listening on port ${config.port}`);
});
