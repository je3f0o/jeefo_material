/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-31
* Updated at  : 2020-10-31
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

const Observer       = require("@jeefo/observer");
const md_theme       = require("@jeefo/material/services/theme");
const class_modifier = require("@jeefo/material/utils/class_modifier");

exports.style = `
/* sass */
@use "sass:map"
@import '@jeefo/material'

$font-weights: ()
$font-weights: map.merge($font-weights, ("thin"        : 100))
$font-weights: map.merge($font-weights, ("extra-light" : 200))
$font-weights: map.merge($font-weights, ("light"       : 300))
$font-weights: map.merge($font-weights, ("regular"     : 400))
$font-weights: map.merge($font-weights, ("medium"      : 500))
$font-weights: map.merge($font-weights, ("semi-bold"   : 600))
$font-weights: map.merge($font-weights, ("bold"        : 700))
$font-weights: map.merge($font-weights, ("extra-bold"  : 800))
$font-weights: map.merge($font-weights, ("black"       : 900))

%block
    display: block

=typography ($size, $weight, $letter-space)
    font:
        size   : $size
        weight : map.get($font-weights, $weight)
    letter-spacing : $letter-space

.md-typography
    font:
        size  : 16px
        family: Roboto

    &--h1
        @extend %block
        +typography(96px, "light", -1.5px)
    &--h2
        @extend %block
        +typography(60px, "light", -0.5px)
    &--h3
        @extend %block
        +typography(48px, "regular", 0)
    &--h4
        @extend %block
        +typography(34px, "regular", 0.25px)
    &--h5
        @extend %block
        +typography(24px, "regular", 0)
    &--h6
        @extend %block
        +typography(20px, "medium", 0.15px)

    &--subtitle-1
        @extend %block
        +typography(16px, "regular", 0.15px)
    &--subtitle-2
        @extend %block
        +typography(14px, "medium", 0.1px)

    &--body-1
        +typography(16px, "regular", 0.5px)
    &--body-2
        +typography(14px, "regular", 0.25px)

    &--button
        +typography(14px, "medium", 1.25px)
        text-transform: uppercase

    &--caption
        +typography(12px, "regular", 0.4px)

    &--overline
        +typography(10px, "medium", 1.5px)
        text-transform: uppercase
`;

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-typography
    +theme-modifiers(&)
        +property-template(color)
`);

const modifiers = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle-1",
    "subtitle-2",
    "body-1",
    "body-2",
    "button",
    "caption",
    "overline",
];

exports.bindings = {
    color   : '@',
    variant : '@',
};

exports.controller = class MDTypography {
    on_init ($element) {
        const root = "md-typography";
        $element.add_class(root);

        const observer = new Observer(this);
        if (typeof this.variant === "string") {
            const on_variant_change = class_modifier(
                $element.DOM_element, root, modifiers
            );
            observer.on("variant", v => on_variant_change(v.toLowerCase()));
            on_variant_change(this.variant.toLowerCase());
        }
        if (typeof this.color === "string") {
            const on_color_change = class_modifier(
                $element.DOM_element, root, ["primary", "secondary", "error"]
            );
            observer.on("variant", v => on_color_change(v.toLowerCase()));
            on_color_change(this.color.toLowerCase());
        }
    }
};
