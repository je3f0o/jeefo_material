/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-08
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

const Observer       = require("@jeefo/observer");
const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");
const theme_service  = require("../../services/theme");

const ripple = JeefoDOMParser.parse(`{jt} mdRipple`)[0];

exports.style = `
/* sass */
@import '@jeefo/material'

.md-button
    $root: &

    +flex-center($is_inline: true)
    cursor          : pointer
    border          : none
    height          : 36px
    min-width       : 64px
    padding         : 0 8px
    outline         : none
    overflow        : hidden
    position        : relative
    box-sizing      : border-box
    background      : transparent
    will-change     : transform
    border-radius   : 4px
    vertical-align  : middle
    text-decoration : none

    -webkit-user-select : none
    -moz-user-select    : none
    -ms-user-select     : none
    user-select         : none

    &:disabled
        color          : currentColor
        cursor         : default
        opacity        : .38
        pointer-events : none

    .md-ripple
        border-radius: 4px

    //&:not(:disabled)

    // contained
    &--contained
        padding: 0 16px

        &:not(:disabled)
            +elevate(2)

            &:hover,
            &:focus
                +elevate(4)
            &:active
                +elevate(8)

    // outlined
    &--outlined
        border  : 1px solid currentColor
        padding : 0 15px

    &#{&}--icon
        color         : currentColor
        height        : unset
        min-width     : unset
        border-radius : 50%

        &#{$root}--small
            padding: 8px

        &#{$root}--medium
            padding: 12px

    &--fab
        +size(56px)
        +elevate(6)
        padding          : 0
        min-width        : unset
        border-radius    : 50%
        background-color : currentColor

        &:disabled
            +elevate(0)

        &:hover,
        &:focus
            +elevate(8)
        &:active
            +elevate(12)

        &#{$root}--extented
            $height: 48px
            +size(auto, $height)
            padding       : 0 20px
            border-radius : $height / 2

            > .md-icon
                margin-right: 8px
`;

theme_service.set_default({
    ".md-button": {
        "color": "$primary-color",
    },
    ".md-button--contained": {
        "color"            : "$on_primary-color",
        "background-color" : "$primary-color",
    },
    ".md-button--contained:disabled": {
        "color"            : "rgba($on_surface-color, .38)",
        "background-color" : "$divider-color",
    },
    ".md-button--fab": {
        "color"            : "$on_secondary-color",
        "background-color" : "$secondary-color",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-button
    $root: &

    +property-template(color)

    //&:not(:disabled)
        +property-template(color)

    &--contained
        +property-template(color, background-color)
        &:disabled
            +property-template(color, background-color)
    &--fab
        +property-template(color, background-color)
`);

exports.template = element => {
    const typography = JeefoDOMParser.parse(`{jt}
        mdTypography[variant="button"]
    `)[0];
    while (element.firstChild) {
        typography.appendChild(element.firstChild);
    }

    if (element.hasAttribute("href")) {
        const anchor = JeefoDOMParser.parse(`{jt}a`)[0];
        element = JeefoDOMParser.replace(element, anchor);
    } else {
        const button = JeefoDOMParser.parse(`{jt}button`)[0];
        button.setAttribute("type", "button");
        element = JeefoDOMParser.replace(element, button);
    }

    element.classList.add("md-button");
    element.appendChild(typography);
    element.appendChild(ripple.cloneNode());
    return element;
};

exports.bindings = {
    size        : "@",
    variant     : "@",
    is_disabled : "<isDisabled",
};

exports.controller = class MDButton {
    on_init ($element) {
        let variant;
        this.$element       = $element;
        const observer      = new Observer(this);
        const {DOM_element} = $element;

        const on_disable_change = is_disabled => {
            DOM_element.disabled = !! is_disabled;
            const method = DOM_element.disabled ? "add" : "remove";
            DOM_element.classList[method]("md-button--disabled");
        };

        const on_variant_change = value => {
            if (variant === "fab extented") {
                $element.remove_class("md-button--fab", "md-button--extented");
            } else if (variant) {
                $element.remove_class(`md-button--${variant}`);
            }

            if (value) {
                variant = value.toLowerCase();
                switch (variant) {
                    case "fab"       :
                    case "outlined"  :
                    case "contained" :
                        $element.add_class(`md-button--${variant}`);
                        break;
                    case "icon"      :
                        $element.add_class("md-button--icon");
                        this.set_size(this.size);
                        break;
                    case "fab extented":
                        $element.add_class("md-button--fab", "md-button--extented");
                        break;
                }
            }
        };

        on_variant_change(this.variant);
        on_disable_change(this.is_disabled);
        observer.on("variant"     , on_variant_change);
        observer.on("is_disabled" , on_disable_change);
    }

    set_size (value) {
        const {$element} = this;
        if ([null, void 0].includes(value)) value = "small";

        switch (value) {
            case "sm"     :
            case "small"  :
                $element.add_class(`md-button--small`);
                break;
            case "md"     :
            case "medium" :
                $element.add_class(`md-button--medium`);
                break;
            case "lg"  :
            case "large" :
                $element.add_class(`md-button--large`);
                break;
        }
    }
};

exports.controller_name = "$md_button";