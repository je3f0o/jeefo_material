/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_elevation.js
* Created at  : 2019-07-19
* Updated at  : 2019-09-13
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

const get_opacity = level => {
    switch (level) {
        case 1 : return 0.05;
        case 2 : return 0.07;
        case 3 : return 0.08;
        case 4 : case 5 : return 0.09;
        case 6 : case 7 : return 0.11;
        case  8 : case  9 :
        case 10 : case 11 :
            return 0.12;
        case 12 : case 13 :
        case 14 : case 15 :
            return 0.14;
        case 16 : case 17 :
        case 18 : case 19 :
        case 20 : case 21 :
        case 22 : case 23 :
            return 0.15;
        case 24 : return 0.16;
    }
    return 0;
};

let style = '';
for (let i = 1; i <= 24; ++i) {
    style += `
        [md-elevation="${i}"] {
            z-index          : ${i};
            background-color : rgba(255, 255, 255, ${ get_opacity(i) });
        }
    `;
}

styles.add_style(style, { "md-attribute" : "md-elevation" });
