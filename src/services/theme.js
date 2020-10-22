/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : theme.js
* Created at  : 2019-12-02
* Updated at  : 2020-10-13
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

const typography     = require("./typography");
const color_palletes = require("../utils/color_palletes");

const COMMA_REGEX = /,\s*/;
const PROPS_REGEX = /^"props\:\[(.+)\]"$/;
const parse_props = value => {
    if (typeof value === "string") {
        const match = value.match(PROPS_REGEX);
        if (match && match[1]) return match[1].split(COMMA_REGEX);
    }
    return null;
};

const parser = document.createElement("style");
parser.setAttribute("md-theme-parser", '');
document.head.appendChild(parser);

const parse_css_rules = css_text => {
    parser.textContent = css_text;

    const result     = [];
    const {sheet}    = parser;
    const {cssRules} = sheet;
    for (let i = 0; i < cssRules.length; i += 1) result.push(cssRules[i]);

    while (cssRules.length) sheet.deleteRule(0);
    parser.removeChild(parser.firstChild);

    return result;
};

const is_var_name = v => typeof v === "string" && v.charAt(0) === '$';

class MDThemeService {
    constructor () {
        this.dark = {
            typography,
        };

        this.rules  = [];
        this.themes = [];

        this.style_element = document.createElement("style");
        this.style_element.setAttribute("md-theme", '');
        document.head.appendChild(this.style_element);
    }

    register (rules) {
        const {sheet} = this.style_element;
        sheet.insertRule(rules, sheet.cssRules.length);
    }

    add_rules (css_text) {
        const {sheet} = this.style_element;

        for (const theme of this.themes) {
            const rules = parse_css_rules(css_text);
            for (const rule of rules) {
                const css_rule = `${theme.selector} ${rule.cssText}`;
                sheet.insertRule(css_rule, sheet.cssRules.length);
            }
        }

        //this.rules.push(rules);
    }

    register_theme ({selector, colors, rules}) {
        const vars = {};

        for (let color_key of Object.keys(colors)) {
            const value = colors[color_key].toLowerCase();
            const pallete = color_palletes[value];
            color_key = color_key.toLowerCase();

            if (pallete) {
                for (let variant of Object.keys(pallete)) {
                    const var_name = `$${color_key}-color-${variant}`;
                    vars[var_name.toLowerCase()] = pallete[variant];
                }
                vars[`$${color_key}-color`] = pallete[500];
            } else {
                vars[`$${color_key}-color`] = value;
            }
        }

        this.themes.push({selector, rules, colors, vars});
    }

    register_template (css_text) {
        const {sheet}        = this.style_element;
        const template_rules = parse_css_rules(css_text);

        for (const theme of this.themes) {
            for (const {style, selectorText} of template_rules) {
                const rules     = [];
                const selectors = selectorText.split(COMMA_REGEX);

                for (let selector of selectors) {
                    for (const prop of parse_props(style.content)) {
                        const scope = theme.rules[selector];
                        if (! scope) {
                            throw new Error(`MDThemeService '${
                                selector
                            }' selector not found: '${ theme.selector }'`);
                        }
                        let value = scope[prop];
                        if (! value) {
                            throw new Error(`MDThemeService '${
                                prop
                            }' value not found in: '${ selector }'`);
                        } else if (is_var_name(value)) {
                            value = theme.vars[value.toLowerCase()];
                        }

                        rules.push(`${prop}:${value}`);
                    }

                    selector = `${theme.selector} ${selector}`;
                    const css_rule = `${selector} {${rules.join(';')}}`;
                    sheet.insertRule(css_rule, sheet.cssRules.length);
                }
            }
        }
    }
}

module.exports = new MDThemeService();
