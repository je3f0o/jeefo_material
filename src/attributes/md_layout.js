/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_layout.js
* Created at  : 2019-07-19
* Updated at  : 2019-12-31
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

const styles = require("@jeefo/component/styles");

styles.add_style(`
/* css */
[layout=""],
[layout="row"] {
    display        : flex;
    flex-direction : row;
}
[layout="column"] {
    display        : flex;
    flex-direction : column;
}
[layout-align~="x-start"] {
    justify-content: start;
}
[layout-align~="y-start"] {
    align-self: start;
}
[layout-align="end"] {
    justify-content: flex-end;
}
[layout-align="space-around"] {
    justify-content: space-around;
}
[layout-align="space-between"] {
    justify-content: space-between;
}
[layout-align="none end"] {
    align-items: flex-end;
}
[layout-align="none center"] {
    align-items: center;
}
[layout-align="center center"] {
    align-items     : center;
    justify-content : center;
}
layout-space-filler, [layout-space-filler] {
    flex: 1 1 0;
}
[layout-align-self="start"] {
    align-self: start;
}
`, { "md-attribute" : "md-layout" });
