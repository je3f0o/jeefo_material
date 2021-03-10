/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : divider.js
* Created at  : 2020-10-18
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

const theme_service = require("../services/theme");

exports.selector = "md-divider";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-divider
    +size(100%, 1px)
    display     : block
    flex-shrink : 0

    &--vertical
        +size(1px, 100%)
`;

theme_service.set_default({
    ".md-divider": {
        "background-color": "$divider-color"
    }
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-divider
    +property-template(background-color)
`);

exports.bindings = {
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
    }
};

exports.controller_name = "$md_divider";
