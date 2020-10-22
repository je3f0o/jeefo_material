/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : item.js
* Created at  : 2019-10-08
* Updated at  : 2020-07-05
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
const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");

const ripple = JeefoDOMParser.parse(`{jt} mdRipple`)[0];

module.exports = {
    selector : "md-list-item",

    bindings : {
        isSelected : '<'
    },

    template : element => {
        element.classList.add("md-list__item");
        element.setAttribute("layout", "row");
        element.setAttribute("layout-align", "none center");
		element.appendChild(ripple.cloneNode());
    },

    controller : class MDListItem {
        on_init ($element) {
            const observer = new Observer(this);
            const on_select = is_selected => {
                if (is_selected) {
                    $element.add_class("md-list__item--selected");
                } else {
                    $element.remove_class("md-list__item--selected");
                }
            };
            on_select(this.isSelected);
            observer.on("isSelected", on_select);
            /*
            if ($element.first(":scope > md-icon")) {
                $element.add_class("has-icon");
            }
            */
        }
    }
};
