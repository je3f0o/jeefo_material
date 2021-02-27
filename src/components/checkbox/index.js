/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-10-28
* Updated at  : 2021-02-26
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

const Observer             = require("@jeefo/observer");
const theme_service        = require("../../services/theme");
const TranscludeController = require("@jeefo/component/transclude_controller");

const root = "md-checkbox";

exports.style = `
/* sass */
@import '@jeefo/material'
@import '@jeefo/material/components/ripple/style'
@import '@jeefo/material/components/selection/ripple'

$size          : 40px
$padding       : 8px
$border-width  : 2px
$checkbox-size : 18px

%abs-box
    +size($size)
    +abs($top: -$padding, $left: -$padding)

.md-checkbox
    $root: &

    +rel
    display: inline-block

    input
        @extend %abs-box
        cursor  : pointer
        margin  : 0
        opacity : 0

        &:disabled ~ .md-icon
            opacity: .38

        &:not(:disabled)
            &:hover + #{$root}__ripple:before
                opacity   : $ripple_hover_opacity
                transform : scale(1)
            &:focus + #{$root}__ripple:before
                opacity   : $ripple_focus_opacity
                transform : scale(1)

            &:active
                + #{$root}__ripple:before
                    transition: opacity 100ms linear, transform 250ms ease
                    opacity   : 0
                    transform : scale(0.7)
                + #{$root}__ripple:after
                    opacity   : $ripple_active_opacity
                    transform : scale(1)

            // Emphasis
            ~ .md-icon
                opacity: .6
            &:checked ~ .md-icon
                opacity: 1

        &:checked ~ .md-icon
            &:after
                transition: background-position .18s linear
                background:
                    image    : linear-gradient(to left, currentColor 50%, transparent 50%)
                    position : left
            > svg
                fill: currentColor

    .md-icon
        z-index        : 0
        pointer-events : none
        vertical-align : bottom

        &:after
            $delta: ($size - ($padding * 2) - $checkbox-size) / 2
            +size($checkbox-size)
            +abs($top: $delta, $left: $delta)
            border        : 2px solid currentColor
            z-index       : 0
            content       : ''
            box-sizing    : border-box
            border-radius : 2px
            background:
                size     : 200%
                position : right

        > svg
            +rel
            fill    : none
            z-index : 1

    &__ripple
        +selection_ripple
`;

theme_service.set_default({
    ".md-checkbox input:checked ~ *": {
        "color": "$primary-color",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-checkbox
    input:checked ~ *
        +property-template(color)
`);

const transcluder = new TranscludeController(`
{ jt }
input[type="checkbox"] +
.md-checkbox__ripple +
mdIcon[name="check_box"]
`);
const transcluded_attrs = ["id", "name"];

exports.template = element => {
    transcluder.transclude(element);
    const input = element.firstChild;

    let i = element.attributes.length;
    while (i--) {
        const {name, value} = element.attributes[i];
        if (name.startsWith("on--") || transcluded_attrs.includes(name)) {
            input.setAttribute(name, value);
            element.removeAttribute(name);
        }
    }

    element.classList.add(root);
};

exports.bindings = {
    value      : '=',
    isDisabled : '<',
};

exports.controller = class MDCheckbox {
    on_init ($element) {
        const $input   = $element.children(0);
        const input    = $input.DOM_element;
        const observer = new Observer(this);

        $input.on("change", () => {
            if (input.checked) {
                if (! this.value) this.value = true;
            } else if (this.value) {
                this.value = false;
            }
        });

        observer.on("isDisabled", value => {
            if (value) {
                input.disabled = true;
                $element.add_class("md-checkbox--disabled");
            } else {
                input.disabled = false;
                $element.remove_class("md-checkbox--disabled");
            }
            $input.trigger("state_changed", {bubbles: false});
            $element.trigger("state_changed", {bubbles: false});
        });

        if (this.value) input.checked = true;
    }
};
