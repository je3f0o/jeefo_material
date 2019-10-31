/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : option.js
* Created at  : 2019-10-07
* Updated at  : 2019-10-16
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

module.exports = {
    selector : "option",

    bindings : {
        isSelected : '<'
    },

    controller ($element) {
        const observer = new Observer(this);

        observer.on("isSelected", is_selected => {
            if (is_selected) {
                $element.DOM_element.selected = true;
            }
        });

        $element.once("renderable", () => {
            $element.trigger("option_added", { bubbles : true });
        });
    }
};
