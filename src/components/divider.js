/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : divider.js
* Created at  : 2020-10-18
* Updated at  : 2020-11-18
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

const md_theme = require("@jeefo/material/services/theme");

exports.selector = "md-divider";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-divider
    +size(100%, 1px)
    flex-shrink : 0

    &--vertical
        +size(1px, 100%)
`;

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-divider
    +property-template(background-color)
`);

exports.bindings = {
    variant     : "@",
    orientation : "@",
};

exports.controller = class MDDivider {
    on_init ($element) {
        $element.add_class("md-divider");

        if (typeof this.orientation === "string") {
            const orientation = this.orientation.toLowerCase();
            if (orientation === "vertical") {
                $element.add_class("md-divider--vertical");
            }
        }

        if (typeof this.variant === "string") {
            const variant = this.variant.toLowerCase();
            switch (variant) {
            }
        }
    }
};

exports.controller_name = "$md_divider";
