/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2021-01-14
* Updated at  : 2021-03-11
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

const fs      = require("@jeefo/fs");
const path    = require("path");
const Jeefo   = require("jeefo");
const {parse} = require("url");

(async function main () {
    const material_path         = path.resolve(`${__dirname}/..`);
    const material_symlink_path = "./node_modules/@jeefo/material";
    if (! await fs.exists(material_symlink_path)) {
        await fs.symlink(material_path, material_symlink_path);
    }

    const jeefo    = new Jeefo();
    const {server} = jeefo;

    const public_dir = `${__dirname}/public`;

    const template    = await fs.load_json(`${public_dir}/jeefo.webmanifest`);
    const light_theme = await fs.load_json(`${public_dir}/themes/light.json`);
    const dark_theme  = await fs.load_json(`${public_dir}/themes/dark.json`);

    server.on("http_listen", () => {
        const {port} = server.config.http;
        console.log(`Listening on: http://0.0.0.0:${port}`);
    });

    server.on("https_listen", () => {
        const {port} = server.config.https;
        console.log(`Listening on: https://0.0.0.0:${port}`);
    });

    server.router.register({
        path   : "/lbc.webmanifest",
        method : "get",
        description : `PWA Web manifest`,
    }, async (req, res) => {
        if (! req.headers.referer) return res.sendStatus(403);

        const url      = parse(req.headers.referer);
        const origin   = `${url.protocol}//${url.host}`;
        const manifest = Object.assign({}, template);

        let start_url = `${origin}/`;
        if (req.query.last_state_url) {
            start_url = `${origin}${req.query.last_state_url}`;
        }
        if (req.query.theme === "dark") {
            manifest.theme_color      = dark_theme.status;
            manifest.background_color = dark_theme.background;
        } else {
            manifest.theme_color      = light_theme.status;
            manifest.background_color = light_theme.background;
        }

        manifest.start_url = start_url;
        manifest.icons = template.icons.map(icon => {
            return Object.assign({}, icon, {src: `${origin}${icon.src}`});
        });

        res.json(manifest);
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