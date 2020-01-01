/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_icon.js
* Created at  : 2019-07-21
* Updated at  : 2019-12-06
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
const icons    = require("../services/icons");

module.exports = {
    selector : "md-icon",
    bindings : {
        name       : "@",
        size       : '<',
        view_box   : "@viewBox",
        fill_color : "@color",
    },
    style : `
        md-icon {
            display        : inline-block;
            vertical-align : middle;
        }
        md-icon > svg {
            fill    : currentColor;
            display : block;
        }
    `,
    template : `
        { jt }
        svg[xmlns="http://www.w3.org/2000/svg"]
    `,
    controller : function ($element) {
        const $svg = $element.children(0);
        if (this.fill_color) {
            $svg.set_attr("fill", this.fill_color);
        }
        $svg.attrs({
            width   : this.size || 24,
            height  : this.size || 24,
            viewBox : this.view_box || "0 0 24 24"
        }, false);
        $svg.DOM_element.innerHTML = icons[this.name];

        const observer = new Observer(this);
        observer.on("name", value => {
            $svg.DOM_element.innerHTML = icons[value];
        });
        observer.on("view_box", value => {
            $svg.set_attr("viewBox", value, false);
        });
        observer.on("fill_color", value => {
            $svg.set_attr("fill", value, false);
        });
    }
};
