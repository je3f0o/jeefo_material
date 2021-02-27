/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : register.js
* Created at  : 2021-01-14
* Updated at  : 2021-02-28
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

const for_each            = require("@jeefo/utils/object/for_each");
const {definitions_table} = require("@jeefo/component");

const directives = {
    "theme"    : "@jeefo/material/directives/md_theme",
    "emphasis" : "@jeefo/material/directives/md_emphasis",
    //"md-elevation" : "@jeefo/material/directives/md_elevation",
};

for_each(directives, (selector, path) => {
    definitions_table.register_directive(selector, path);
});
