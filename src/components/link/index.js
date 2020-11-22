/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-29
* Updated at  : 2020-11-03
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

const md_theme       = require("@jeefo/material/services/theme");
const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");

exports.style = `
/* sass */
@import '@jeefo/material'

.md-link
    color: currentColor

    &:focus
        outline: none

    &:hover, &:focus
        text-decoration: underline

    &--underline-on-hover
        text-decoration: none
        &:hover, &:focus
            text-decoration: underline
`;

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-link
    $root: &

    +theme-modifiers($root, (primary, secondary))
        +property-template(color)
`);

exports.template = element => {
    const anchor = document.createElement("a");
    JeefoDOMParser.replace(element, anchor);
    anchor.classList.add("md-link");
    return anchor;
};

exports.bindings = {
    color   : '@',
    variant : '@',
};

exports.controller = class MDLink {
    on_init ($element) {
        if (typeof this.color === "string") {
            const color = this.color.toLowerCase();
            switch (color) {
                case "primary"   :
                case "secondary" :
                    $element.add_class(`md-link--${color}`);
                    break;
            }
        }

        if (typeof this.variant === "string") {
            const variant = this.variant.toLowerCase();
            switch (variant) {
                case "underline-on-hover" :
                    $element.add_class(`md-link--${variant}`);
                    break;
            }
        }
    }
};
