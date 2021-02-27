/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2021-01-31
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

const jqlite               = require("@jeefo/jqlite");
const Observer             = require("@jeefo/observer");
const theme_service        = require("../../services/theme");
const TranscludeController = require("@jeefo/component/transclude_controller");

const root  = "md-radio";
const slice = [].slice;

exports.style = `
/* sass */
@import '@jeefo/material'
@import '@jeefo/material/components/ripple/style'
@import '@jeefo/material/components/selection/ripple'

$ripple_size         : 40px
$size                : 24px
$padding             : 2px
$outer_circle_size   : $size - ($padding*2)
$margin              : ($ripple_size - $size) / 2
$inner_circle_size   : 10px
$inner_circle_margin : ($outer_circle_size - $inner_circle_size) / 2

$anim_function: cubic-bezier(0, 0, 0.2, 1)
$anim_duration: 0.12s

%abs-box
    +size($ripple_size)
    +abs($top: -$margin, $left: -$margin)

.md-radio
    $root: &

    +rel
    +size($outer_circle_size)
    padding        : $padding
    display        : inline-block
    vertical-align : bottom

    input
        @extend %abs-box
        cursor  : pointer
        margin  : 0
        opacity : 0

        &:disabled ~ #{$root}__icon
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
            ~ #{$root}__icon
                opacity: .6
            &:checked ~ #{$root}__icon
                opacity: 1

        &:checked ~ #{$root}__icon:after
            transform: scale(1)

    &__icon
        +rel
        +size($outer_circle_size)
        pointer-events : none

        &::before,
        &::after
            content       : ''
            display       : block
            border-radius : 50%

        &::before
            +size(100%)
            border     : 2px solid currentColor
            box-sizing : border-box

        &::after
            +abs($top: $inner_circle_margin, $left: $inner_circle_margin)
            +size($inner_circle_size)
            transform  : scale(0)
            background : currentColor
            transition : transform $anim_duration $anim_function

    &__ripple
        +selection_ripple
`;

theme_service.set_default({
    ".md-radio input:checked ~ *": {
        "color": "$primary-color",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-radio
    input:checked ~ *
        +property-template(color)
`);

const transcluder = new TranscludeController(`
{ jt }
input[type="radio"] +
.md-radio__ripple +
.md-radio__icon
`);
const transcluded_attrs = ["id", "name", "value"];

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
    isSelected : '<',
    isDisabled : '<',
};

exports.controller = class MDRadioButton {
    on_init ($element) {
        const $input   = $element.children(0);
        const input    = $input.DOM_element;
        const observer = new Observer(this);

        $input.on("change", () => {
            if (input.checked && input.name) {
                this.deactivate_others(input);
            }
        });

        observer.on("isSelected", value => {
            if (value) input.checked = true;
            else if (input.checked) {
                input.checked = false;
                $input.trigger("change");
            }
        });

        observer.on("isDisabled", value => {
            if (value) {
                input.disabled = true;
                $element.add_class("md-radio--disabled");
            } else {
                input.disabled = false;
                $element.remove_class("md-radio--disabled");
            }
            $input.trigger("state_changed", {bubbles: false});
            $element.trigger("state_changed", {bubbles: false});
        });

        if (this.isSelected) input.checked = true;
    }

    deactivate_others (input) {
        let target = document, el = input;
        while ((el = el.parentNode)) {
            if (el.tagName === "FORM") {
                target = el;
                break;
            }
        }
        const query   = `input[type="radio"][name="${input.name}"]`;
        const elems   = target.querySelectorAll(query);
        const $inputs = slice.call(elems).map(jqlite);
        for (const $i of $inputs) {
            if ($i.DOM_element !== input) {
                $i.DOM_element.checked = false;
                $i.trigger("change");
            }
        }
    }
};

exports.controller_name = "$md_radio";
