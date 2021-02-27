/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : sheet.js
* Created at  : 2021-02-27
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

const functions = require("./functions");

const FN_REGEX    = /^\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((.*)\)\s*$/;
const COMMA_REGEX = /\s*,\s*/;

const trim        = v => v.trim();
const is_var_name = v => v.charAt(0) === '$';

class MDThemeSheet {
    constructor () {
        this.rules = Object.create(null);
    }

    add (theme, sheet) {
        for (let [selector, block] of Object.entries(sheet)) {
            const style = {};
            for (let [prop, value] of Object.entries(block)) {
                const matches = value.match(FN_REGEX);
                if (matches) {
                    matches.shift(); // ignore input string
                    const fn = functions[matches.shift()];
                    if (fn) {
                        const args = matches[0].split(COMMA_REGEX).map(trim);
                        value = fn(theme, args);
                    }
                } else if (is_var_name(value)) {
                    value = theme.eval_variable(value);
                }

                style[prop] = value;
            }
            this.rules[selector] = style;
        }
    }
}

module.exports = MDThemeSheet;
