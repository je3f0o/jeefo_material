/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_tab_label.js
* Created at  : 2019-07-05
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
    selector   : "md-tab-label",
    dependencies : {
        $md_tab  : "mdTab",
        $md_tabs : "mdTabs",
    },
    controller : function ($element) {
        const { $md_tab, $md_tabs } = this;

        //$element.on("click", $md_tab.active.bind($md_tab));
        $element.on("click", () => {
            if (! $md_tabs.$is_disabled) {
                $md_tab.active();
            }
        });

        /*
        if (! _mdTabs.is_ink_disabled) {
            ripple(this.$element, {
                color_element : _mdTabs.$ink_bar[0]
            });
        }
        */

        this.$ripple = new MDRipple($element);

        $md_tab.$label = $element;
        $md_tabs.$pagination.append($element);
    },
};
