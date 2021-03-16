 jeefo.register("./directives/register.js", async (exports, module) => { const __dirname = "./directives", __filename = "./directives/register.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const for_each            = (await require("@jeefo/utils/object/for_each"));
const {definitions_table} = (await require("@jeefo/component"));

const directives = {
    "md-theme"    : "@jeefo/material/directives/theme",
    "md-emphasis" : "@jeefo/material/directives/emphasis",
    //"md-elevation" : "@jeefo/material/directives/md_elevation",
};

for_each(directives, (selector, path) => {
    definitions_table.register_directive(selector, path);
});
 }); 
//# sourceURL=./directives/register.js 