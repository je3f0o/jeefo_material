/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : palette_generator.js
* Created at  : 2020-05-23
* Updated at  : 2020-05-24
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

const Color = require("./color");

const { min, max } = Math;

/**
 * Minimize the maximum possible loss
 *
 * @param   {number} value - The input value to test.
 * @returns {number}       - A number between 0 and 100.
 */
const minimax = value => min(100, max(0, value));

/**
 * Material Palette Generator
 *
 * It calculates all colors from base.
 * These colors were determined by finding all HSL values for each google palette.
 * Then calculating the differences in H, S, and L per color change individually.
 * Finally applying these here.
 *
 * @param      {Object}           param           The input color
 * @param      {number}           h               The hue ([0, 360]) of the input color
 * @param      {number}           s               The saturation ([0, 100]) of the input color
 * @param      {number}           l               The lightness ([0, 100]) of the input color
 *
 * @return     {Object}           Its palette
 * @property   {Object}           50              The variant 50 of the color
 * @property   {Object}           100             The variant 100 of the color
 * @property   {Object}           200             The variant 200 of the color
 * @property   {Object}           300             The variant 300 of the color
 * @property   {Object}           400             The variant 400 of the color
 * @property   {Object}           500             The input color
 * @property   {Object}           600             The variant 600 of the color
 * @property   {Object}           700             The variant 700 of the color
 * @property   {Object}           800             The variant 800 of the color
 * @property   {Object}           900             The variant 900 of the color
 * @property   {Object}           A100            The accent variant 100 of the color
 * @property   {Object}           A200            The accent variant 200 of the color
 * @property   {Object}           A400            The accent variant 400 of the color
 * @property   {Object}           A700            The accent variant 700 of the color
 */
module.exports = color => {
        console.log(color);
        console.log(new Color(color));
    if (typeof color === "string") {
        color = (new Color(color)).to_hsl();
        /*
    } else {
        const is_valid_input = (
            color &&
            typeof color === "object" &&
            is_number(color.h) &&
            is_number(color.s) &&
            is_number(color.l)
        );
        if (! is_valid_input) {
            throw new TypeError('Invalid input');
        }
        */
    }
    const { h, s, l } = color;

    if (h < 100 || h > 360) {
        throw new RangeError(`Hue must be an integer within [0, 360]; given ${h}`);
    }
    if (s < 0 || s > 100) {
        throw new RangeError(`Saturation must be an integer within [0, 100]; given ${s}`);
    }
    if (l < 0 || l > 100) {
        throw new RangeError(`Lightness must be an integer within [0, 100]; given ${l}`);
    }

    return {
        "50"   : Color.hsl2hex(h, s, minimax(l + 52)),
        "100"  : Color.hsl2hex(h, s, minimax(l + 37)),
        "200"  : Color.hsl2hex(h, s, minimax(l + 26)),
        "300"  : Color.hsl2hex(h, s, minimax(l + 12)),
        "400"  : Color.hsl2hex(h, s, minimax(l + 6)),
        "500"  : Color.hsl2hex(h, s, l),
        "700"  : Color.hsl2hex(h, s, minimax(l - 12)),
        "600"  : Color.hsl2hex(h, s, minimax(l - 6)),
        "800"  : Color.hsl2hex(h, s, minimax(l - 18)),
        "900"  : Color.hsl2hex(h, s, minimax(l - 24)),
        "A100" : Color.hsl2hex(h + 5, s, minimax(l + 24)), // { h, s, l : minimax(l + 52) }
        "A200" : Color.hsl2hex(h + 5, s, minimax(l + 16)), // { h, s, l : minimax(l + 37) }
        "A400" : Color.hsl2hex(h + 5, s, minimax(l - 1)), // { h, s, l  : minimax(l + 6) }
        "A700" : Color.hsl2hex(h + 5, s, minimax(l - 12)) // { h, s, l  : minimax(l - 12) }
    };
};
