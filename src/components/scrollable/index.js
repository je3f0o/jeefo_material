/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-08-02
* Updated at  : 2021-02-28
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

const theme_service = require("../../services/theme");

exports.style = `
/* sass */
@import '@jeefo/material'

.md-scrollable
    +size(100%)
    display  : block
    overflow : auto

    &::-webkit-scrollbar
        +size(10px)

    &--overlay
        overflow: overlay
`;

theme_service.set_default({
    ".md-scrollable::-webkit-scrollbar-track": {
        "background-color": "rgba($on_surface-color, .09)",
    },
    ".md-scrollable::-webkit-scrollbar-thumb": {
        "background-color": "rgba($on_surface-color, .15)",
    },
    ".md-scrollable::-webkit-scrollbar-thumb:hover": {
        "background-color": "rgba($on_surface-color, .3)",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-scrollable
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-thumb:hover
        +property-template(background-color)
`);

exports.template = element => {
    element.classList.add("md-scrollable");
};

exports.controller = class MDScrollable {
    on_init ($element) {
        const has_variant = $element.has_class("md-scrollable--overlay");
        if (! has_variant) {
            const variant = $element.get_attr("variant");
            if (variant) $element.add_class(`md-scrollable--${variant}`);
        }
    }
};

exports.controller_name = "$md_scrollable";
