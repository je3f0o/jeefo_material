/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : color.js
* Created at  : 2020-05-24
* Updated at  : 2021-02-27
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

const is_number = require("@jeefo/utils/is/number");

const {isInteger}                       = Number;
const {min: min_fn, max: max_fn, round} = Math;

const REGEX_HEX_SHORT = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
const REGEX_HEX_LONG  = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

const type_error = () => { throw new TypeError("Invalid input"); };
const validate_args_length = args => {
    if (args.length !== 3) throw new Error("Missing argument");
};

const validate_normalized = value => {
    if (! is_number(value)) type_error();

    if (value < 0 || value > 1) {
        throw new RangeError(
            [
                "Normalized components must be float numbers between 0 and 1.",
                `Given value ${value} is out of range.`
            ].join(' ')
        );
    }

    return value;
};

const validate_rgb_components = values => {
    for (const value of values) {
        if (! is_number(value) || ! isInteger(value)) type_error();
        if (value < 0 || value > 255) {
            throw new RangeError(
                [
                    "RGB components must be interger numbers in between 0 and 255.",
                    `Given value ${value} is not valid.`
                ].join(' ')
            );
        }
    }
};

const parse_values = values => values.split(',').map(v => +(v.trim()));

const parse_rgba = value => {
    const values = parse_values(value.slice(5, -1));
    if (values.length !== 4) type_error();
    validate_rgb_components(values.slice(0, 3));
    validate_normalized(values[3]);
    return values;
};

const parse_rgb = value => {
    const values = parse_values(value.slice(4, -1));
    if (values.length !== 3) type_error();
    validate_rgb_components(values);
    return values;
};

/*
const REGEX_RGB  = /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
const REGEX_RGBA = REGEX_RGB.toString()
    .replace("rgb", "rgba")
    .replace("\\)", ",\\s*(\\d+)\\s*\\)");
*/

const named_colors = {
    white : "#FFF",
    black : "#000",
    red   : "#F00",
    green : "#0F0",
    blue  : "#00F",
};

const hex_component = value => value.toString(16).padStart(2, '0');

const hex2rgb = color => {
    const regex  = color.length === 4 ? REGEX_HEX_SHORT : REGEX_HEX_LONG;
    const result = color.match(regex);

    if (! result) type_error();
    result.shift();
    return result.map(v => {
        if (v.length === 1) v += v;
        return parseInt(v, 16);
    });
};

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

function _constructor (instance, type_or_color, args) {
    if (type_or_color.startsWith('#')) {
        instance.type   = "rgb";
        instance.values = hex2rgb(type_or_color);
    } else if (type_or_color.startsWith("rgb(")) {
        const values = parse_rgb(type_or_color);
        instance.type   = "rgb";
        instance.values = values;
    } else if (type_or_color.startsWith("rgba(")) {
        const values = parse_rgba(type_or_color);
        instance.type   = "rgba";
        instance.values = values;
    } else {
        switch (type_or_color) {
            case "rgb" :
                validate_args_length(args);
                validate_rgb_components(args);
                instance.type   = type_or_color;
                instance.values = args;
                break;
            case "hsl" :
                validate_args_length(args);
                const [h,s,l] = args;
                if (h < 0 || h > 360) {
                    throw new RangeError(
                        `Hue must be an integer within [0, 360]. Given ${h}`
                    );
                }
                if (s < 0 || s > 100) {
                    throw new RangeError(
                        [
                            "Saturation must be an integer within [0, 100].",
                            `Given ${s}`
                        ].join(' ')
                    );
                }
                if (l < 0 || l > 100) {
                    throw new RangeError(
                        [
                            "Lightness must be an integer within [0, 100].",
                            `Given ${l}`
                        ].join(' ')
                    );
                }
                instance.type   = type_or_color;
                instance.values = args;
                break;
            case "normalized_rgb" :
            case "normalized_hsl" :
                instance.type   = type_or_color;
                instance.values = args.slice(0, 3).map(validate_normalized);
                break;
            default:
                if (named_colors[type_or_color]) {
                    _constructor(instance, named_colors[type_or_color]);
                } else {
                    type_error();
                }
        }
    }
}

class Color {
    constructor (type_or_color, ...args) {
        _constructor(this, type_or_color, args);
    }

    toString (type = this.type, opacity = 1) {
        let result;
        const {type:old_type, values} = this;

        switch (type) {
            case "rgb" : {
                this.to_rgb();
                const [r,g,b] = this.values;
                result = `rgb(${r}, ${g}, ${b})`;
                break;
            }
            case "rgba" : {
                this.to_rgb();
                const [r,g,b] = this.values;
                result = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                break;
            }
            case "hsl" :
                this.to_hsl();
                const [h,s,l] = this.values;
                result = `hsl(${round(h)}, ${round(s)}%, ${round(l)}%)`;
                break;
            case "hex" :
                result = `#${
                    this.to_rgb().values.map(hex_component).join('')
                }`;
                break;
            case undefined: break;
            default: type_error();
        }

        this.type   = old_type;
        this.values = values;

        return result;
    }

    normalize () {
        switch (this.type) {
            case "hsl" :
                this.type       = "normalized_hsl";
                this.values[0] /= 360;
                this.values[1] *= 0.01;
                this.values[2] *= 0.01;
                break;
            case "rgb" :
                this.type   = "normalized_rgb";
                this.values = this.values.map(v => v / 255);
                break;
            case "normalized_rgb" :
            case "normalized_hsl" :
                break;
            default: type_error();
        }
        return this;
    }

    to_rgb () {
        switch (this.type) {
            case "rgb"            : return this;
            case "hsl"            : this.normalize(); break;
            case "normalized_hsl" : break;
            case "normalized_rgb" :
                this.type   = "rgb";
                this.values = this.values.map(v => round(v * 255));
                return this;
            case "rgba":
                this.type   = "rgb";
                this.values = this.values.slice(0, 3);
                return this;
            default: type_error();
        }
        let r, g, b;
        const [h,s,l] = this.values;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + one_over_3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - one_over_3);
        }

        this.type   = "rgb";
        this.values = [round(r * 255), round(g * 255) ,round(b * 255)];

        return this;
    }

    to_hsl () {
        switch (this.type) {
            case "hsl" : return this;
            case "rgb" : this.normalize(); break;
            case "normalized_rgb" : break;
            case "normalized_hsl" :
                this.type       = "hsl";
                this.values[0] *= 360;
                this.values[1] *= 100;
                this.values[2] *= 100;
                return this;
            default: type_error();
        }
        const [r,g,b] = this.values;
        const min     = min_fn(r, g, b);
        const max     = max_fn(r, g, b);
        const delta   = max - min;

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

        this.type   = "hsl";
        this.values = [h, s * 100, l * 100];

        return this;
    }

    blend (background, alpha) {
        if (! (background instanceof Color)) background = new Color(background);
        if (background.type !== "rgb") background.to_rgb();
        if (this.type !== "rgb") this.to_rgb();

        for (let i = 0; i < 3; i += 1) {
            const v = (1 - alpha) * background.values[i] + alpha * this.values[i];
            this.values[i] = round(v);
        }
    }

    static blend (background, foreground, alpha) {
        const color     = new Color("rgb", 0, 0, 0);
        const bg_values = background.values;
        const fg_values = foreground.values;
        for (let i = 0; i < 3; i += 1) {
            const v = (1 - alpha) * bg_values[i] + alpha * fg_values[i];
            color.values[i] = round(v);
        }
        return color;
    }
}

module.exports = Color;
