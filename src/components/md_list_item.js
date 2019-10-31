/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_list_item.js
* Created at  : 2019-10-08
* Updated at  : 2019-10-09
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
    selector : "md-list-item",

    style : `
        md-list-item {
            width         : 100%;
            height        : 48px;
            cursor        : pointer;
            padding       : 0 8px 0 16px;
            display       : block;
            overflow      : hidden;
            box-sizing    : border-box;
            line-height   : 48px;
            white-space   : nowrap;
            text-overflow : ellipsis;
        }
        md-list-item:hover {
            background-color : rgba(255, 255, 255, .12);
        }
    `,

    //template : ``,

    controller : class MDListItem {
        on_init () {
        }
    }
};
