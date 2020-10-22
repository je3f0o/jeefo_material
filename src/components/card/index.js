/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-09-30
* Updated at  : 2020-09-27
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

const Observer = require("@jeefo/observer");

exports.selector = "md-card";

exports.style    = "#include style.sass";
exports.template = `
{jt}
mdSurface[elevation="1"] >
    jfContent[select="md-toolbar"] +
    .md-card__body >
        jfContent
`;

exports.bindings = {
    variant : '<'
};

exports.controller = class MDCard {
    on_init ($element) {
        $element.add_class("md-card");
        const observer = new Observer(this);

        const on_varient_change = (new_value, old_value) => {
            if (old_value) $element.remove_class(`md-card--${old_value}`);
            $element.add_class(`md-card--${new_value}`);
        };

        observer.on("variant", on_varient_change);
        if (this.variant) on_varient_change(this.variant);
    }
};
