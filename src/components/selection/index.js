/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-28
* Updated at  : 2020-10-30
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
//const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");

exports.style = `
/* sass */
@import '@jeefo/material'

$size          : 40px
$padding       : 8px
$border-width  : 2px
$checkbox-size : 18px

%abs-box
    +size($size)
    +abs($top: -$padding, $left: -$padding)

.md-selection
    $root: &

    padding     : $padding
    display     : inline-block
    user-select : none

    > label
        cursor: pointer

    &__checkbox
        +rel
        display        : inline-block
        vertical-align : bottom

        + label
            margin-left: 4px

        > input[type="checkbox"]
            @extend %abs-box
            cursor  : pointer
            margin  : 0
            opacity : 0

            &:hover + #{$root}__ripple::before
                opacity: .08

            &:checked ~ .md-icon
                &::before
                    transition: background-position .18s linear
                    background:
                        image    : linear-gradient(to left, currentColor 50%, transparent 50%)
                        position : left
                > svg
                    fill: currentColor

        & > #{$root}__ripple
            &::before, &::after
                @extend %abs-box
                content          : ''
                opacity          : 0
                transition       : opacity .15s linear
                border-radius    : 50%
                pointer-events   : none
                background-color : currentColor

        > .md-icon
            margin-right   : $padding
            pointer-events : none

            &::before
                $delta: ($size - ($padding * 2) - $checkbox-size) / 2
                +size($checkbox-size)
                +abs($top: $delta, $left: $delta)
                content       : ''
                box-sizing    : border-box
                border        : 2px solid currentColor
                border-radius : 2px
                background:
                    size     : 200%
                    position : right

            > svg
                fill: none
`;

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-selection
    $root: &

    &--checked
        +theme-modifiers($root, (primary, secondary))
            #{$root}__checkbox
                +property-template(color)
`);

/*
const elems = JeefoDOMParser.parse(`
{jt}
input#remember_me.md-selection__input[type="checkbox"] +
.md-selection__ripple +
mdIcon[name="check_box"]
`);

const svg_template = '<svg viewBox="0 0 24 24">P</svg>'
    .replace("P", '<path d="M1.73,12.91 8.1,19.28 22.79,4.59" fill="none"/>');
*/

//elems.push(JeefoDOMParser.parse(svg_template)[0]);

/*
exports.template = element => {
    element.classList.add("md-selection");
    for (const e of elems) element.appendChild(e);
};
*/

exports.template = `
{jt}
.md-selection__checkbox >
    jfContent[select="input"] +
    .md-selection__ripple +
    mdIcon[name="check_box"] ^
jfContent[select="label"]
`;

exports.bindings = {
    color: '@'
};

exports.controller = class MDSelection {
    on_init ($element) {
        $element.add_class("md-selection");
        const $input = $element.first("input");

        const is_checked = () => {
            if ($input.DOM_element.checked) {
                $element.add_class("md-selection--checked");
            } else {
                $element.remove_class("md-selection--checked");
            }
        };
        is_checked();
        $input.on("change", is_checked);

        if (typeof this.color === "string") {
            const color = this.color.toLowerCase();
            switch (color) {
                case "primary"   :
                case "secondary" :
                    $element.add_class(`md-selection--${color}`);
                    break;
            }
        }
    }
};
