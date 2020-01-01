/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : color.js
* Created at  : 2019-12-02
* Updated at  : 2019-12-02
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

const REGEX_HEX_SHORT = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
const REGEX_HEX_LONG  = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const REGEX_RGB  = /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
/*
const REGEX_RGBA = REGEX_RGB.toString()
    .replace("rgb", "rgba")
    .replace("\\)", ",\\s*(\\d+)\\s*\\)");
*/

const color_names = {
    white : "#FFF",
    black : "#000",
    red   : "#F00",
    green : "#0F0",
    blue  : "#00F",
};

const illuminance_formula = value => {
    value /= 255;
    return (value <= 0.03928)
        ? value / 12.92
        : Math.pow(((value + 0.055) / 1.055), 2.4);
};

const to_rgb = value => {
    let color = color_names[value.toLowerCase()] || value;

    if (color.length === 4) {
        const result = color.match(REGEX_HEX_SHORT);
        if (result) {
            const [,r,g,b] = result;
            color = `#${ [r,g,b].map(c => c.repeat(2)).join('') }`;
        }
    }

    const result = color.match(REGEX_HEX_LONG);
    return result ? {
        r : parseInt(result[1], 16),
        g : parseInt(result[2], 16),
        b : parseInt(result[3], 16)
    } : null;
};

const hex_component = value => value.toString(16).padStart(2, '0');

module.exports = class Color {
    constructor (value) {
        value = value.trim();
        const color = to_rgb(value);
        if (! color) {
            throw new Error("Invalid color");
        }

        this.r     = color.r;
        this.g     = color.g;
        this.b     = color.b;
        this.value = value;
    }

    get illuminance () {
        let { r, g, b } = this;
        [r, g, b] = [r, g, b].map(illuminance_formula);
        return r * 0.2126 + g * 0.7152 + b * 0.0722;
    }

    get is_dark () {
        return this.illuminance < 128;
    }

    get is_light () {
        return this.illuminance >= 128;
    }

    toString (opacity) {
        if (typeof opacity === "number" && opacity !== 1) {
            const { r, g, b } = this;
            return `rgba(${r},${g},${b},${ opacity })`;
        }
        return this.to_hex();
    }

    to_hex () {
        if (this.value.charAt(0) === '#') {
            return this.value;
        }

        const components = [this.r, this.g, this.b];
        return `#${ components.map(hex_component).join('') }`;
    }
};
