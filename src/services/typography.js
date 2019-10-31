/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : typography.js
* Created at  : 2019-10-07
* Updated at  : 2019-10-11
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

const styles   = require("@jeefo/component/styles");
const for_each = require("@jeefo/utils/object/for_each");

const weigths = {
    thin        : 100,
    extra_light : 200,
    light       : 300,
    regular     : 400,
    medium      : 500,
    semi_bold   : 600,
    bold        : 700,
    extra_bold  : 800,
    black       : 900,
};

class MDTypography {
    constructor () {
        this.style_el = styles.add_style(``, { "md-class" : "md-typography" });

        this.config = {
            root_font_size      : 16,
            default_font_family : "Roboto",
        };

        this.styles = {
            h1 : {
                "font-size"    : "96px",
                font_weight    : "light",
                letter_spacing : -1.5,
            },
            h2 : {
                "font-size"    : "60px",
                font_weight    : "light",
                letter_spacing : -0.5,
            },
            h3 : {
                "font-size"    : "48px",
                font_weight    : "regular",
                letter_spacing : 0,
            },
            h4 : {
                "font-size"    : "34px",
                font_weight    : "regular",
                letter_spacing : 0.25,
            },
            h5 : {
                "font-size"    : "24px",
                font_weight    : "regular",
                letter_spacing : 0,
            },
            h6 : {
                "font-size"    : "20px",
                font_weight    : "medium",
                letter_spacing : 0.15,
            },
            ".md-subtitle-1" : {
                "font-size"    : "16px",
                font_weight    : "regular",
                letter_spacing : 0.15,
            },
            ".md-subtitle-2" : {
                "font-size"    : "14px",
                font_weight    : "medium",
                letter_spacing : 0.1,
            },
            ".md-body-1" : {
                "font-size"    : "16px",
                font_weight    : "regular",
                letter_spacing : 0.5,
            },
            ".md-body-2" : {
                "font-size"    : "14px",
                font_weight    : "regular",
                letter_spacing : 0.25,
            },
            ".md-button" : {
                "font-size"      : "14px",
                font_weight      : "medium",
                letter_spacing   : 1.25,
                "text-transform" : "uppercase",
            },
            ".md-caption" : {
                "font-size"    : "10px",
                font_weight    : 400,
                letter_spacing : 0.4,
            },
            ".md-overline" : {
                "font-size"    : "10px",
                font_weight    : "regular",
                letter_spacing : 1.5,
            },
            ".md-truncate" : {
                overflow        : "hidden;",
                "white-space"   : "nowrap;",
                "text-overflow" : "ellipsis;",
            }
        };
    }

    init (config = {}) {
        for_each(this.config, (prop, value) => {
            if (! config[prop]) {
                config[prop] = value;
            }
        });

        const rules                 = [];
        const font_famity_selectors = [];

        for_each(this.styles, (selector, values) => {
            const props         = [];
            let has_font_family = false;
            for_each(values, (prop, value) => {
                switch (prop) {
                    case "font_weight" :
                        if (typeof value === "string") {
                            value = weigths[value.toLowerCase()];
                        }
                        props.push(`font-weight: ${ value }`);
                        break;
                    case "font_family" :
                        has_font_family = true;
                        props.push(`font-family: ${ value }`);
                        break;
                    case "letter_spacing" :
                        value = value / config.root_font_size;
                        props.push(`letter-spacing: ${ value }rem`);
                        break;
                    default:
                        props.push(`${ prop }: ${ value }`);
                }
            });
            if (! has_font_family) {
                font_famity_selectors.push(selector);
            }
            rules.push({ selector, props });
        });

        rules.unshift({
            selector : font_famity_selectors.join(", "),
            props    : [`font-family: ${ config.default_font_family }`]
        });
        rules.unshift({
            selector : "html",
            props    : [`font-size: ${ config.root_font_size }px`]
        });

		this.style_el.textContent = rules.map(rule => {
            return `${ rule.selector } { ${ rule.props.join("; ") }; }`;
        }).join('\n');
    }
}

module.exports = new MDTypography();
