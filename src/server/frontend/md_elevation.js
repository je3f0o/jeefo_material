/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_elevation.js
* Created at  : 2021-01-09
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

const styles = require("@jeefo/component/styles");

const elevation_levels = [1, 2, 3, 4, 6, 8, 12, 16, 24];
const transparencies   = {
    1  : 5,
    2  : 7,
    3  : 8,
    4  : 9,
    6  : 11,
    8  : 12,
    12 : 14,
    16 : 15,
    24 : 16,
};
for (const [key, value] of Object.entries(transparencies)) {
    transparencies[key] = value / 100;
}

(() => {
    const rules = [];
    for (const level of elevation_levels) {
        rules.push(`[md-elevation="${level}"]{z-index:${level}}`);
    }
    styles.add_style(rules.join(''), {"md-attribute" : "md-elevation"});
})();

const shadow_key_umbra_opacity      = 0.2;
const shadow_key_penumbra_opacity   = 0.14;
const shadow_ambient_shadow_opacity = 0.12;

const box_shadows = {
    1: [
        `0 1px 1px    0 rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 2px 1px -1px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 1px 3px    0 rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    2: [
        `0 2px 2px    0 rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 3px 1px -2px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 1px 5px    0 rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    3: [
        `0 3px 4px    0 rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 3px 3px -2px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 1px 8px    0 rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    4: [
        `0 4px  5px    0 rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 1px 10px    0 rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 2px  4px -1px rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    6: [
        `0 6px 10px    0 rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 1px 18px    0 rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 3px  5px -1px rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    8: [
        `0 8px 10px  1px rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 3px 14px  2px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 5px  5px -3px rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    12: [
        `0px 12px 17px 2px rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0px  5px 22px 4px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0px  7px 8px -4px rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    16: [
        `0 16px 24px  2px rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0  6px 30px  5px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0  8px 10px -5px rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
    24: [
        `0  9px 46px  8px rgba(0,0,0,${shadow_key_penumbra_opacity})`,
        `0 11px 15px -7px rgba(0,0,0,${shadow_ambient_shadow_opacity})`,
        `0 24px 38px  3px rgba(0,0,0,${shadow_key_umbra_opacity})`,
    ].join(','),
};

module.exports = (rules, is_dark) => {
    if (is_dark) {
        for (const level of elevation_levels) {
            const alpha    = transparencies[level];
            const bg_color = `blend($background-color, #fff, ${alpha})`;
            rules[`[md-elevation="${level}"]`] = {
                "box-shadow"       : box_shadows[level],
                "background-color" : bg_color,
            };
        }
    } else {
        for (const level of elevation_levels) {
            rules[`[md-elevation="${level}"]`] = {
                "box-shadow": box_shadows[level],
            };
        }
    }
};
