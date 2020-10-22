/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : body.js
* Created at  : 2020-08-11
* Updated at  : 2020-08-11
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

exports.selector = ["md-collapse-body"];

exports.template = `
{ jt }
.md-collapse__body__measument >
    jfContent
`;

exports.bindings = {
    isOpen : '<'
};

exports.controller = class MDCollapseBody {
    on_init ($element) {
        $element.add_class("md-collapse__body");
        const $measure   = $element.children(0);
        const measure_el = $measure.DOM_element;

        const collapse_handler = is_open => {
            if (is_open) {
                $measure.style("marginTop", 0);
                $element.add_class("open");
            } else {
                $measure.style("marginTop", `${-measure_el.clientHeight}px`);
                $element.remove_class("open");
            }
        };

        const observer = new Observer(this);
        observer.on("isOpen", collapse_handler);

        // initialize
        measure_el.style.display    = "block";
        measure_el.style.transition = "none";
        collapse_handler(this.isOpen);
        $measure.trigger_reflow();
        measure_el.style.transition = null;
    }
};
