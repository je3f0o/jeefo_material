/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : theme.js
* Created at  : 2021-02-27
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

const Color        = require("../../utils/color");
const functions    = require("./functions");
const MDThemeSheet = require("./sheet");

const FN_REGEX    = /^\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((.*)\)\s*$/;
const COMMA_REGEX = /\s*,\s*/;
const PROPS_REGEX = /^"props\:\[(.+)\]"$/;
const COLOR_REGEX = /^#(?:[0-9A-F]{3}){1,2}|rgb\(/im;
const RGBA2_REGEX = /^\s*rgba\s*\(\s*(\S+)\s*,\s*(\d*\.\d*)\s*\)\s*$/;

const trim        = v => v.trim();
const is_var_name = v => v.charAt(0) === '$';
//const is_opacue_color = v => COLOR_REGEX.test(v);

const parse_props = value => {
    if (typeof value === "string") {
        const match = value.match(PROPS_REGEX);
        if (match && match[1]) return match[1].split(COMMA_REGEX);
    }
    return null;
};

const style_element = document.createElement("style");
style_element.setAttribute("md-theme--styles", '');
document.head.appendChild(style_element);
const style_sheet = style_element.sheet;

const compute_color = value => {
    style_element.style.color = value;
    let {color} = getComputedStyle(style_element);
    color = new Color(color);
    return color.to_rgb();
};

class MDTheme {
    constructor (name, colors, rules, sheet) {
        this.name          = name;
        this.vars          = Object.create(null);
        this.sheet         = new MDThemeSheet();
        this.default_sheet = new MDThemeSheet();
        this.selector      = `[md-theme="${name}"]`;

        for (let [key, value] of Object.entries(colors)) {
            if (! COLOR_REGEX.test(value)) {
                const matches = value.match(RGBA2_REGEX);
                if (matches) {
                    const color = compute_color(matches[1]);
                    value = `rgba(${color.values.join(',')},${matches[2]})`;
                } else {
                    this.style_element.style.color = value;
                    value = getComputedStyle(this.style_element).color;
                }
            }
            this.vars[`$${key}-color`] = value;
        }

        if (sheet) this.sheet.add(this, sheet);
        if (rules) this.eval_rules(rules);
    }

    eval_rules (sheet) {
        for (let [selector, block] of Object.entries(sheet)) {
            const css_rules = [];
            for (let [prop, value] of Object.entries(block)) {
                const matches = value.match(FN_REGEX);
                if (matches) {
                    matches.shift(); // ignore input string
                    const fn = functions[matches.shift()];
                    if (fn) {
                        const args = matches[0].split(COMMA_REGEX).map(trim);
                        value = fn(this, args);
                    }
                } else if (is_var_name(value)) {
                    value = this.eval_variable(value);
                }
                css_rules.push(`${prop}:${value}`);
            }

            selector = `${this.selector} ${selector}`;
            const css_rule = `${selector} {${css_rules.join(';')}}`;
            style_sheet.insertRule(css_rule, style_sheet.cssRules.length);
        }
    }

    get_color (value) {
        if (is_var_name(value)) {
            value = this.eval_variable(value);
        } else {
            style_element.style.color = value;
            value = getComputedStyle(style_element).color;
        }
        return new Color(value);
    }

    eval_variable (var_name) {
        const value = this.vars[var_name.toLowerCase()];
        if (! value) {
            throw new Error(`${var_name} is not defined.`);
        }
        return value;
    }

    get_rules (selector) {
        return this.sheet.rules[selector] || this.default_sheet.rules[selector];
    }

    eval_css_rules (css_rules) {
        for (const {style, selectorText} of css_rules) {
            const selectors = selectorText.split(COMMA_REGEX);

            for (let selector of selectors) {
                const css_rules = [];
                for (const prop of parse_props(style.content)) {
                    const rules = this.get_rules(selector);
                    if (! rules) {
                        throw new Error(`MDThemeService: '${
                            selector
                        }' selector rules not found in '${this.name}' theme.`);
                    }
                    const value = rules[prop];
                    if (! value) {
                        throw new Error(`MDThemeService property '${
                            prop
                        }' is not found in: '${selector}'`);
                    }

                    css_rules.push(`${prop}:${value}`);
                }

                selector = `${this.selector} ${selector}`;
                const css_rule = `${selector} {${css_rules.join(';')}}`;
                style_sheet.insertRule(css_rule, style_sheet.cssRules.length);
            }
        }
    }
}

module.exports = MDTheme;
