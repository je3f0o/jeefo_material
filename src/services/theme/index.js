/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-12-02
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

const MDTheme = require("./theme");

const parser = document.createElement("style");
parser.setAttribute("md-theme--parser", '');
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

class MDThemeService {
    constructor () {
        this.themes = [];
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
    }

    set_default (defaults) {
        for (const theme of this.themes) {
            theme.default_sheet.add(theme, defaults);
        }
    }

    register_theme ({name, colors, rules, sheet}) {
        this.themes.push(new MDTheme(name, colors, rules, sheet));
    }

    register_template (css_text) {
        const css_rules = parse_css_rules(css_text);
        for (const theme of this.themes) {
            theme.eval_css_rules(css_rules);
        }
    }
}

module.exports = new MDThemeService();
