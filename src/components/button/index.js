/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-08
* Updated at  : 2020-10-19
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
const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");

const ripple = JeefoDOMParser.parse(`{jt} mdRipple`)[0];

const style = `
/* sass */
@import '@jeefo/material'

.md-button
    $root: &

    cursor          : pointer
    border          : none
    height          : 36px
    min-width       : 64px
    padding         : 0 8px
    outline         : none
    overflow        : hidden
    position        : relative
    box-sizing      : border-box
    user-select     : none
    border-radius   : 4px
    vertical-align  : middle

    +flex-center($is_inline: true)

    color      : currentColor
    background : transparent

    // typegraphy
    font-style      : inherit
    font-variant    : inherit
    line-height     : normal
    text-decoration : none
    white-space     : nowrap

    &:hover
        cursor: pointer

    &:disabled
        cursor         : default
        pointer-events : none

    // contained
    &--contained
        padding: 0 16px
        &:disabled
            box-shadow: none

    // outlined
    &--outlined
        padding: 0 16px

        &:after
            top            : 0
            left           : 0
            width          : 100%
            height         : 100%
            border         : 1px solid currentColor
            opacity        : 0.5
            content        : ''
            position       : absolute
            box-sizing     : border-box
            border-radius  : 4px
            pointer-events : none

        //&:hover:after
            opacity: 1

    &--fab
        +size(56px)
        padding          : 0
        min-width        : unset
        border-radius    : 50%
        background-color : currentColor
        &:disabled
            box-shadow: none

        &#{$root}--extented
            $height: 48px
            +size(auto, $height)
            padding       : 0 20px
            border-radius : $height / 2

            > .md-icon
                margin-right: 8px

    &--icon
        height        : unset
        padding       : 8px
        min-width     : unset
        border-radius : 50%
`;

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-button
    $root: &

    +theme-modifiers($root, (primary, secondary))
        +property-template(color)

    &:disabled
        +property-template(color)

    &--contained
        +property-template(color, box-shadow, background-color)

        &:hover, &--hovered
            +property-template(box-shadow)

        &:active, &--activated
            +property-template(box-shadow)

        +theme-modifiers($root, (primary, secondary))
            +property-template(color, background-color)

        &:disabled
            +property-template(background-color)

    &--icon
        +theme-modifiers($root, (primary, secondary))
            +property-template(color)

    &--fab
        +property-template(box-shadow)

        &:hover, &--hovered
            +property-template(box-shadow)

        &:active, &--activated
            +property-template(box-shadow)

        +theme-modifiers($root, (primary, secondary))
            +property-template(color)
            > *
                +property-template(color)

        &:disabled
            +property-template(color)
            > *
                +property-template(color)

        > *
            +property-template(color)
`);

module.exports = {
    style,

    template : element => {
        if (element.hasAttribute("href")) {
            const anchor = document.createElement("a");
            element = JeefoDOMParser.replace(element, anchor);
        } else {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            element = JeefoDOMParser.replace(element, button);
		}

		element.classList.add("md-button");
		element.appendChild(ripple.cloneNode());
        return element;
    },

	bindings : {
		color       : "@",
		variant     : "@",
		is_disabled : "<isDisabled",
	},

	controller ($element) {
		const observer = new Observer(this);
        const disable_handler = is_disabled => {
			if (is_disabled) {
				$element.set_attr("disabled");
			} else {
				$element.remove_attr("disabled");
			}
		};

		observer.on("is_disabled", disable_handler);
        disable_handler(this.is_disabled);

        if (typeof this.color === "string") {
            const color = this.color.toLowerCase();
            switch (color) {
                case "primary"   :
                case "secondary" :
                    $element.add_class(`md-button--${color}`);
                    break;
            }
        }

        if (typeof this.variant === "string") {
            const variant = this.variant.toLowerCase();
            switch (variant) {
                case "fab"       :
                case "icon"      :
                case "outlined"  :
                case "contained" :
                    $element.add_class(`md-button--${variant}`);
                    break;
                case "fab extented":
                    $element.add_class("md-button--fab", "md-button--extented");
                    break;
            }
        }
	},
    controller_name: "$md_button"
};