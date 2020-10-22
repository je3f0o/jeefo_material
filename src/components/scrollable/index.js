/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-08-02
* Updated at  : 2020-08-02
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

module.exports = {
    selector : "md-scrollable",

    style : "#include style.sass",

    template (element) {
        element.classList.add("md-scrollable");
    },

    controller : class MDScrollable {
        on_init ($element) {
            const has_variant = $element.has_class("md-scrollable--overlay");
            if (! has_variant) {
                const variant = $element.get_attr("variant");
                if (variant) $element.add_class(`md-scrollable--${variant}`);
            }
        }
    }
};
