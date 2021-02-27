/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : container.js
* Created at  : 2019-06-21
* Updated at  : 2021-02-23
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

const md_theme = require("../../services/theme");

exports.selector = "md-sidenav-container";

exports.style = `
/* sass */
@import '@jeefo/material'

$anim_func: cubic-bezier(.25,.8,.25,1)
$anim_duration: .4s

%full-height
    height : 100%

.md-sidenav-container
    +rel
    +size(100%)
    display  : block
    overflow : hidden

    &__wrapper
        @extend %full-height
        box-sizing: border-box
        transition: padding $anim_duration $anim_func

    &__viewport
        @extend %full-height
        +rel

    &__content
        @extend %full-height

    &__backdrop
        +abs($all: 0)
        opacity          : .12
        z-index          : 15
        background-color : black

.md-sidenav
    $root: &

    +abs($top: 0, $bottom: 0)
    width      : 320px
    box-sizing : border-box

    &--left
        left: 0
        &#{$root}--side
            border-right:
                width: 1px
                style: solid
    &--right
        right: 0
        &#{$root}--side
            border-left:
                width: 1px
                style: solid

    &--over
        z-index    : 16
        transition : transform $anim_duration $anim_func
`;

md_theme.set_default({
    ".md-sidenav--side": {
        "border-color": "$divider-color",
    },
});

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-sidenav
    $root: &

    &--side
        +property-template(border-color)
`);

exports.template = `
    { jt }
    .md-sidenav-container__wrapper >
        .md-sidenav-container__viewport >
            .md-sidenav-container__content >
                jfContent ^
            jfContent[select="md-sidenav"]
`;

exports.controller = $element => {
    $element.add_class("md-sidenav-container");
};

exports.controller_name = "$md_sidenav_container";
