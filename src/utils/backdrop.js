/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : backdrop.js
* Created at  : 2019-12-10
* Updated at  : 2019-12-11
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

const jqlite = require("@jeefo/jqlite");

module.exports = $container => {
    const class_list = ["md-backdrop"].join(' ');
    const $element = jqlite(`<div class="${ class_list }"></div>`);
    $container.append($element);
    return $element;
};
