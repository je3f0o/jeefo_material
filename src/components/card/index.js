/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-09-30
* Updated at  : 2021-02-24
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

exports.selector = "md-card";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-card
    +elevate(1)
    display       : block
    overflow      : hidden
    border-radius : 4px

    &--outlined
        +elevate(0)
        border     : 1px solid
        box-sizing : border-box

    &--shape
        &--square
            border-radius: unset
`;

theme_service.set_default({
    ".md-card--outlined": {
        "border-color": "$divider-color",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-card
    &--outlined
        +property-template(border-color)
`);

exports.template = `{jt}mdSurface > jfContent`;

exports.bindings = {
    shape   : '@',
    variant : '@',
};

exports.controller = class MDCard {
    on_init ($element) {
        let variant, shape;
        const observer = new Observer(this);
        $element.add_class("md-card");

        const on_varient_change = value => {
            if (variant) $element.remove_class(`md-card--${variant}`);
            if (value) {
                variant = value.toLowerCase();
                $element.add_class(`md-card--${variant}`);
            }
        };

        const on_shape_change = value => {
            if (shape) $element.remove_class(`md-card--shape--${shape}`);
            if (value) {
                shape = value.toLowerCase();
                $element.add_class(`md-card--shape--${shape}`);
            }
        };

        on_shape_change(this.shape);
        on_varient_change(this.variant);
        observer.on("shape"   , on_shape_change);
        observer.on("variant" , on_varient_change);

    }
};

exports.controller_name = "$md_card";
