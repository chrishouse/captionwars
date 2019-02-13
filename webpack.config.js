const path = require("path");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve("public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new ImageminPlugin({
            externalImages: {
                context: "src", // Important! This tells the plugin where to "base" the paths at
                sources: glob.sync("src/images/users/*"),
                destination: "public"
            }
        }),
        new ImageminPlugin({
            externalImages: {
                context: "src", // Important! This tells the plugin where to "base" the paths at
                sources: glob.sync("src/images/contests/*"),
                destination: "public"
            }
        }),
        new ImageminPlugin({
            externalImages: {
                context: "src", // Important! This tells the plugin where to "base" the paths at
                sources: glob.sync("src/images/assets/*"),
                destination: "public"
            }
        })
    ]
};
