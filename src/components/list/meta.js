/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : meta.js
* Created at  : 2021-03-04
* Updated at  : 2021-03-04
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

const {parse} = require("@jeefo/jqlite/dom_parser");

exports.template = element => {
    const caption = parse(`{jt}mdTypography[variant="caption"]`)[0];
    while (element.firstChild) {
        caption.appendChild(element.firstChild);
    }
    element.appendChild(caption);
};
