/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-08-01
* Updated at  : 2021-02-24
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
const md_theme       = require("../../services/theme");
const class_modifier = require("../../utils/class_modifier");

exports.selector = "md-surface";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-surface
    +size(100%)
    display: block
`;

md_theme.set_default({
    ".md-surface": {
        "color"            : "$on_surface-color",
        "background-color" : "$surface-color",
    },
    ".md-surface.md-surface--primary": {
        "color"            : "$on_primary-color",
        "background-color" : "$primary-color",
    },
    ".md-surface.md-surface--secondary": {
        "color"            : "$on_secondary-color",
        "background-color" : "$secondary-color",
    },
});

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-surface
    $root: &

    +property-template(color, background-color)

    +theme-modifiers($root, (primary, secondary))
        +property-template(color, background-color)
`);

exports.bindings = {
    color: '@',
};

exports.controller = class MDSurface {
    on_init ($element) {
        const name          = $element.name.toLowerCase();
        const observer      = new Observer(this);
        const modifiers     = ["primary", "secondary", "transparent"];
        const {DOM_element} = $element;

        this.$element = $element;
        $element.add_class("md-surface");

        const on_color_change = class_modifier(DOM_element, name, modifiers);
        observer.on("color", on_color_change);
        on_color_change(this.color);
    }

    is_closer ({DOM_element}) {
        let el = this.$element.DOM_element;
        while ((el = el.parentNode)) {
            if (el === DOM_element) return true;
        }
        return false;
    }
};

exports.controller_name = "$md_surface";
