/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : elevation.js
* Created at  : 2021-03-02
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

const styles        = require("@jeefo/component/styles");
const theme_service = require("../services/theme");

const elevation_levels = [1, 2, 3, 4, 6, 8, 12, 16, 24];
const transparencies   = {
    1  : 0.05,
    2  : 0.07,
    3  : 0.08,
    4  : 0.09,
    6  : 0.11,
    8  : 0.12,
    12 : 0.14,
    16 : 0.15,
    24 : 0.16,
};

(() => {
    const rules = [];
    for (const level of elevation_levels) {
        rules.push(`[md-elevation="${level}"]{z-index:${level}}`);
    }
    styles.add_style(rules.join(''), {"md-attribute" : "md-elevation"});
})();

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

[md-elevation="1"]
	+box-shadow(1)
[md-elevation="2"]
	+box-shadow(2)
[md-elevation="3"]
	+box-shadow(3)
[md-elevation="4"]
	+box-shadow(4)
[md-elevation="6"]
	+box-shadow(6)
[md-elevation="8"]
	+box-shadow(8)
[md-elevation="12"]
	+box-shadow(12)
[md-elevation="16"]
	+box-shadow(16)
[md-elevation="24"]
	+box-shadow(24)
`);

module.exports = (rules, is_dark) => {
    if (is_dark) {
        for (const level of elevation_levels) {
            const alpha    = transparencies[level];
            const bg_color = `blend($background-color, #fff, ${alpha})`;
            rules[`[md-elevation="${level}"]`] = {
                "background-color" : bg_color,
            };
        }
    }
};
