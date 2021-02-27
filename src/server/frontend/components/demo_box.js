/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : demo_box.js
* Created at  : 2021-01-24
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

const md_media = require("@jeefo/material/services/media");
const md_theme = require("@jeefo/material/services/theme");

exports.style = `
/* sass */
@import '@jeefo/material'

.demo-box
    height     : 400px
    border     : 1px solid
    display    : block
    transition : box-shadow 150ms linear

    &:hover
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08), 0 0 15px 0 rgba(0, 0, 0, 0.02), 0 0 20px 4px rgba(0, 0, 0, 0.06)

    .md-theme--viewport--xs &
        margin: 0 -16px

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
        +size(100%, calc(100% - 48px))
        +flex-center

    .md-button
        flex-shrink : 0
`;

md_theme.set_default({
    ".demo-box": {
        "border-color": "$divider-color",
    },
    ".demo-box__appbar": {
        "border-color": "$divider-color",
    },
});

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.demo-box
    +property-template(border-color)

    &__appbar
        +property-template(border-color)
`);

exports.template = `
{jt}
mdSidenavContainer[mdElevation="1"] >
    mdSidenav[
        style    = "width: 200px;"
        isOpen   = "$demo_box.is_open"
        variant  = "{{ $demo_box.mode }}"
        position = "right"
    ] >
        .demo-box__appbar >
            div(Attributes) +
            mdButton[
                size       = "medium"
                variant    = "icon"
                (mouseup)  = "$md_sidenav.close()"
                mdEmphasis = "medium"
            ] >
                mdIcon[name="close"]
            ^   ^
        mdScrollable[style="height: calc(100% - 48px)"] >
            jfContent.demo-box__attributes[select="attributes"]
        ^   ^
    mdSurface >
        .demo-box__appbar >
            jfContent[select="md-tabs" index="$demo_box.index"] +
            mdButton[
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
        this.index = -1;
        $element.add_class("demo-box");

        const on_media_change = () => {
            if (md_media.is("gt-xs")) {
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
