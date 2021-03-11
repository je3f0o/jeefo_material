/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : demo_box.js
* Created at  : 2021-01-24
* Updated at  : 2021-03-11
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

const md_media = require("@jeefo/material/services/media");
const md_theme = require("@jeefo/material/services/theme");

exports.style = `
/* sass */
@import '@jeefo/material'

.demo-box
    $root: &
    $height: 400px

    border     : 1px solid
    display    : block
    transition : box-shadow 150ms linear

    &.vert
        #{$root}__body
            flex-direction: column
            & > *
                flex-grow: 1

    &.no-appbar &__titlebar
        display: none

    .demo-sidenav
        width: 200px

    &:hover
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08), 0 0 15px 0 rgba(0, 0, 0, 0.02), 0 0 20px 4px rgba(0, 0, 0, 0.06)

    &__attr-title
        padding: 12px 0 4px 10px

    &__appbar
        height          : 48px
        padding         : 0 4px 0 16px
        display         : flex
        box-sizing      : border-box
        align-items     : center
        border-bottom   : 1px solid
        justify-content : space-between

    &__attributes
        padding: 6px
        display: block

    &__body
        +flex-center
        width: 100%
        min-height: $height - 48px

    .md-button
        flex-shrink : 0

    &.dense
        .demo-sidenav
            width: 210px

        #{$root}__attributes
            font-size: 14px

        #{$root}__attr-title
            padding: 12px 0 5px 10px

        .md-selection
            padding   : 3px 8px
            label
                font-size   : 14px
                margin-left : 7px !important

        .md-checkbox
            input,
            &__ripple:before,
            &__ripple:after
                +size(28px)
                top  : -3px
                left : -3px
            svg
                +size(22px)
            .md-icon:after
                +size(16px)
                top  : 3px
                left : 3px

        .md-radio
            input,
            &__ripple:before,
            &__ripple:after
                +size(28px)
                top  : -3px
                left : -3px
            svg
                +size(22px)

            &__icon
                +size(18px)
                &:after
                    +size(100%)
                    top  : 0
                    left : 0
            input:checked ~ .md-radio__icon:after
                transform: scale(.5)
`;

md_theme.set_default({
    ".demo-box": {
        "border-color": "$divider-color",
    },
    ".demo-box__appbar": {
        "border-color": "$divider-color",
    },
    ".demo-box__body": {
        "background-color": "$background-color",
    },
});

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.demo-box
    +property-template(border-color)

    &__appbar
        +property-template(border-color)
    &__body
        +property-template(background-color)
`);

exports.template = `
{jt}
mdSidenavContainer[mdElevation="1"] >
    mdSidenav.demo-sidenav[
        isOpen   = "$demo_box.is_open"
        variant  = "{{ $demo_box.mode }}"
        position = "right"
    ] >
        .demo-box__appbar[style="position: relative; z-index: 1;"] >
            div(Configuration) +
            mdButton[
                size       = "medium"
                variant    = "icon"
                (mouseup)  = "$md_sidenav.close()"
                mdEmphasis = "medium"
            ] >
                mdIcon[name="close"]
            ^   ^
        mdScrollable[
            style="position: absolute; top: 0; padding-top: 48px"
        ] >
            jfContent.demo-box__attributes[
                select        = "attributes"
                (initialized) = "$demo_box.has_attrs = true;"
            ]
        ^   ^
    mdSurface >
        .demo-box__appbar.demo-box__titlebar >
            jfContent[select="md-tabs" index="$demo_box.index"] +
            mdButton[
                if         = "$demo_box.has_attrs"
                size       = "medium"
                variant    = "icon"
                jfClass    = "{ hide: $demo_box.is_open && $demo_box.mode === 'side' }"
                (mouseup)  = "$demo_box.is_open = true;"
                mdEmphasis = "medium"
            ] >
                mdIcon[name="tune"]
            ^   ^
        .demo-box__body >
            jfContent
`;

exports.controller = class DemoBox {
    on_init ($element) {
        this.index     = -1;
        this.has_attrs = $element.first("attributes") !== null;
        $element.add_class("demo-box");

        const on_media_change = () => {
            if (md_media.is("gt-xs") && this.has_attrs) {
                this.mode    = "side";
                this.is_open = true;
            } else {
                this.mode    = "over";
                this.is_open = false;
            }
        };

        on_media_change();
        md_media.on("breakpoint_changed", on_media_change);
    }
};

exports.controller_name = "$demo_box";
