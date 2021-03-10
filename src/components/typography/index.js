/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-31
* Updated at  : 2021-03-02
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

const Observer      = require("@jeefo/observer");
const theme_service = require("../../services/theme");

const font_weights = {
    "thin"        : "100",
    "extra-light" : "200",
    "light"       : "300",
    "regular"     : "400",
    "medium"      : "500",
    "semi-bold"   : "600",
    "bold"        : "700",
    "extra-bold"  : "800",
    "black"       : "900",
};

const typography_default_values = {
    ".md-typography": {
        "font-size"   : "16px",
        "font-family" : "Roboto",
    },
};

const variants = {
    h1           : ["96px" , font_weights.light   , "-1.5px" ] ,
    h2           : ["60px" , font_weights.light   , "-0.5px" ] ,
    h3           : ["48px" , font_weights.regular , '0'      ] ,
    h4           : ["34px" , font_weights.regular , ".25px"  ] ,
    h5           : ["24px" , font_weights.regular , '0'      ] ,
    h6           : ["20px" , font_weights.medium  , ".15px"  ] ,
    "subtitle-1" : ["16px" , font_weights.regular , ".15px"  ] ,
    "subtitle-2" : ["14px" , font_weights.medium  , ".1px"   ] ,
    "body-1"     : ["16px" , font_weights.regular , ".5px"   ] ,
    "body-2"     : ["14px" , font_weights.regular , ".25px"  ] ,
    button       : ["14px" , font_weights.medium  , ".25px"  ] ,
    caption      : ["12px" , font_weights.regular , ".4px"   ] ,
    overline     : ["10px" , font_weights.medium  , ".5px"   ] ,
};

for (const [key, [size, weight, letter_space]] of Object.entries(variants)) {
    typography_default_values[`.md-typography--${key}`] = {
        "font-size"      : size,
        "font-weight"    : weight,
        "letter-spacing" : letter_space,
    };
}

exports.style = `
/* sass */
@import '@jeefo/material'

.md-typography
    &--h1,
    &--h2,
    &--h3,
    &--h4,
    &--h5,
    &--h6,
    &--subtitle-1,
    &--subtitle-2
        display: block

    &--button,
    &--overline
        text-transform: uppercase
`;

theme_service.set_default(typography_default_values);

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-typography
    +property-template(font-size, font-family)

    &--h1,
    &--h2,
    &--h3,
    &--h4,
    &--h5,
    &--h6,
    &--subtitle-1,
    &--subtitle-2,
    &--body-1,
    &--body-2,
    &--caption,
    &--button,
    &--overline
        +property-template(font-size, font-weight, letter-spacing)
`);

exports.bindings = {
    variant : '@',
};

exports.controller = class MDTypography {
    on_init ($element) {
        const observer = new Observer(this);
        $element.add_class("md-typography");

        const on_variant_change = (new_value, old_value) => {
            $element.remove_class(`md-typography--${old_value}`);
            if (new_value) $element.add_class(`md-typography--${new_value}`);
        };
        on_variant_change(this.variant);
        observer.on("variant", on_variant_change);
    }
};

exports.controller_name = "$md_typography";
