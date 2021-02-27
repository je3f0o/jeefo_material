/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : functions.js
* Created at  : 2021-02-27
* Updated at  : 2021-02-27
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

const Color = require("../../utils/color");

const functions = Object.create(null);

functions.blend = (theme, args) => {
    if (args.length < 3) throw new Error("Missing argument");
    const bg_color = theme.get_color(args[0]);
    const fg_color = theme.get_color(args[1]);
    const alpha    = +args[2];

    return Color.blend(bg_color, fg_color, alpha).toString("hex");
};

functions.rgba = (theme, args) => {
    if (args.length === 2) {
        const color = theme.get_color(args[0]);
        return `rgba(${color.values.join(',')},${args[1]})`;
    }
    return `rgba(${args.join(',')})`;
};

module.exports = functions;
