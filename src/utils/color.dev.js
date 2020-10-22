/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : color.js
* Created at  : 2019-12-02
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

const Interface = require("@jeefo/utils/class/interface");

const {min: min_fn, max: max_fn, round} = Math;

//const REGEX_HEX_SHORT = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
//const REGEX_HEX_LONG  = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

//const is_number = value => typeof value === "number" && ! isNaN(value);

/*
const REGEX_RGB  = /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
const REGEX_RGBA = REGEX_RGB.toString()
    .replace("rgb", "rgba")
    .replace("\\)", ",\\s*(\\d+)\\s*\\)");

const color_names = {
    white : "#FFF",
    black : "#000",
    red   : "#F00",
    green : "#0F0",
    blue  : "#00F",
};
*/

const illuminance_formula = value => {
    value /= 255;
    return (value <= 0.03928)
        ? value / 12.92
        : Math.pow(((value + 0.055) / 1.055), 2.4);
};

const hex_component = value => value.toString(16).padStart(2, '0');
const rgb2hex = (r, g, b) => `#${ [r, g, b].map(hex_component).join('') }`;

/*
const hex2rgb = value => {
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
*/

const one_over_6 = 1 / 6;
const one_over_3 = 1 / 3;
const two_over_3 = 2 / 3;

const hue2rgb = (p, q, t) => {
    if      (t < 0) { t += 1; }
    else if (t > 1) { t -= 1; }

    if      (t < one_over_6) { return p + (q - p) * 6 * t;                }
    else if (t < 0.5)        { return q;                                  }
    else if (t < two_over_3) { return p + (q - p) * (two_over_3 - t) * 6; }

    return p;
};

class IColor extends Interface {
    constructor () {
        super(IColor);
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
        return (this.value = rgb2hex(this.r, this.g, this.b));
    }

    to_hsl () {
        const r     = this.r / 255;
        const g     = this.g / 255;
        const b     = this.b / 255;
        const min   = Math.min(r, g, b);
        const max   = Math.max(r, g, b);
        const delta = max - min;

        // Lightness
        const l = (max + min) / 2;

        // Hue, Saturation
        let h, s;
        if (delta === 0) {
            h = s = 0; // gray
        } else {
            s = delta / (l > 0.5 ? (2 - max - min) : (max + min));
            switch (max) {
                case r : h =     (g - b) / delta; break;
                case g : h = 2 + (b - r) / delta; break;
                case b : h = 4 + (r - g) / delta; break;
            }
            h *= 60;
        }

        return { h, s : s * 100, l : l * 100 };
    }
}

let HSLColor;

class RGBColor extends IColor {
    constructor (red = 0, green = 0, blue = 0) {
        super ();
        this.red   = red;
        this.green = green;
        this.blue  = blue;
    }

    toString () {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    to_hex () {
        return `#${
            [this.red, this.green, this.blue].map(hex_component).join('')
        }`;
    }

    to_hsl () {
        const r     = this.red   / 255;
        const g     = this.green / 255;
        const b     = this.blue  / 255;
        const min   = min_fn(r, g, b);
        const max   = max_fn(r, g, b);
        const delta = max - min;

        // Lightness
        const l = (max + min) / 2;

        // Hue, Saturation
        let h, s;
        if (delta === 0) {
            h = s = 0; // gray
        } else {
            s = delta / (l > 0.5 ? (2 - max - min) : (max + min));
            switch (max) {
                case r : h =     (g - b) / delta; break;
                case g : h = 2 + (b - r) / delta; break;
                case b : h = 4 + (r - g) / delta; break;
            }
            h *= 60;
        }

        return new HSLColor(h, s * 100, l * 100);
    }
}

class NormalizedHSLColor extends IColor {
    constructor (hue = 0, saturation = 0, lightness = 0) {
        super ();
        this.hue        = hue;
        this.saturation = saturation;
        this.lightness  = lightness;
    }

    toString () {
        return `hsl(${
            round(this.hue * 360)
        }, ${round(this.saturation * 100)}%, ${
            round(this.lightness * 100)
        }%)`;
    }

    to_rgb () {
        let r, g, b;
        const { hue:h, saturation:s, lightness:l } = this;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + one_over_3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - one_over_3);
        }

        return new RGBColor(round(r * 255), round(g * 255) ,round(b * 255));
    }

    to_hex () {
        return this.to_rgb().to_hex();
    }
}

HSLColor = class HSLColor extends IColor {
    constructor (hue = 0, saturation = 0, lightness = 0) {
        super ();
        this.hue        = hue;
        this.saturation = saturation;
        this.lightness  = lightness;
    }

    toString () {
        return `hsl(${
            round(this.hue)
        }, ${round(this.saturation)}%, ${ round(this.lightness) }%)`;
    }

    to_normalized () {
        return new NormalizedHSLColor(
            this.hue        / 360,
            this.saturation * 0.01,
            this.lightness  * 0.01
        );
    }

    to_rgb () {
        return this.to_normalized().to_rgb();
    }

    to_hex () {
        return this.to_rgb().to_hex();
    }
};

exports.IColor   = IColor;
exports.RGBColor = RGBColor;
exports.HSLColor = HSLColor;
