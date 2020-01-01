/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_list_item.js
* Created at  : 2019-10-08
* Updated at  : 2019-12-22
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

const MDRipple = require("../utils/ripple");

module.exports = {
    selector : "md-list-item",

    style : `
        /* css */
        md-list-item {
            width         : 100%;
            height        : 48px;
            cursor        : pointer;
            padding       : 0 8px 0 16px;
            overflow      : hidden;
            position      : relative;
            box-sizing    : border-box;
            white-space   : nowrap;
            text-overflow : ellipsis;
        }
        md-list-item.md-block {
            display     : block;
            line-height : 48px;
        }
        md-list-item.has-icon {
            padding : 0 24px;
        }
        md-list-item.has-icon > md-icon {
            margin-right : 20px;
        }
    `,

    template : node => {
        if (! node.class_list.includes("md-block")) {
            node.attrs.set("layout", "row");
            node.attrs.set("layout-align", "none center");
        }
    },

    controller : class MDListItem {
        on_init ($element) {
            if ($element.first(":scope > md-icon")) {
                $element.add_class("has-icon");
            }

            this.$ripple = new MDRipple($element);
        }
    }
};
