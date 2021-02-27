/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2021-02-02
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

let id = 0;

exports.style = `
/* sass */
@import '@jeefo/material'

.md-selection
    display     : flex
    padding     : 8px
    user-select : none
    align-items : center

    label
        cursor: pointer

    .md-radio,
    .md-checkbox
        + label
            margin-left: 12px

    &--baseline
        align-items : baseline
`;

exports.template = `
{jt}
jfContent[select="md-radio"] +
jfContent[select="md-checkbox"] +
jfContent[
    select     = "label"
    mdEmphasis = "{{ $md_selection.emphasis }}"
]
`;

exports.bindings = {
    align: '@',
};

exports.controller = class MDSelection {
    on_init ($element) {
        const $input  = $element.first("input");
        const input   = $input.DOM_element;
        const $label  = $element.first("label");
        this.emphasis = "medium";
        $element.add_class("md-selection");

        const set_emphasis = () => {
            this.emphasis = input.disabled ? "disabled"
                : input.checked ? "high" : "medium";
        };

        $element.on("initialized", set_emphasis);

        if ($label && $input) {
            id += 1;
            const _id = `md-selection-${id}`;
            $input.set_attr("id"  , _id);
            $label.set_attr("for" , _id);
            $label.on("mousedown", () => $input.trigger("mousedown"));

            $input.on("change", set_emphasis);
            $input.on("state_changed", set_emphasis);
        }

        if (this.align) $element.add_class(`md-selection--${this.align}`);
    }
};

exports.controller_name = "$md_selection";
