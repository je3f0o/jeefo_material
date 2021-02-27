/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : backdrop.js
* Created at  : 2019-12-10
* Updated at  : 2021-01-17
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

const jqlite    = require("@jeefo/jqlite");
const $backdrop = jqlite('<div class="md-sidenav-container__backdrop"></div>');

module.exports = () => $backdrop.clone();
