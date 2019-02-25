import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import config from "./config";
import axios from "axios";

const serverRender = () =>
    axios
        .all([
            axios.get(`${config.serverUrl}/api/contests`),
            axios.get(`${config.serverUrl}/api/users`)
        ])
        .then(resp => {
            return ReactDOMServer.renderToString(
                <App
                    initialContests={resp[0].data.contests}
                    initialUsers={resp[1].data.users}
                />
            );
        })
        .catch(console.error);

export default serverRender;
