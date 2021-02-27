/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2021-01-14
* Updated at  : 2021-02-20
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const fs    = require("@jeefo/fs");
const path  = require("path");
const Jeefo = require("jeefo");

(async function main () {
    const material_path         = path.resolve(`${__dirname}/..`);
    const material_symlink_path = "./node_modules/@jeefo/material";
    if (! await fs.exists(material_symlink_path)) {
        await fs.symlink(material_path, material_symlink_path);
    }

    const jeefo    = new Jeefo();
    const {server} = jeefo;

    server.on("http_listen", () => {
        const {port} = server.config.http;
        console.log(`Listening on: http://0.0.0.0:${port}`);
    });

    server.on("https_listen", () => {
        const {port} = server.config.https;
        console.log(`Listening on: https://0.0.0.0:${port}`);
    });

    server.router.register({
        path   : "*",
        method : "all",
        description : `Undefined route`,
    }, (req, res) => {
        res.sendFile(`${__dirname}/public/index.html`);
    });

    await jeefo.initialize();
    jeefo.start();
})().catch(e => console.error(e));