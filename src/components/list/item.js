/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : item.js
* Created at  : 2019-10-08
* Updated at  : 2021-03-04
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

const IMDListItem = require("./event_handler");

exports.selector = "md-list-item";

exports.template = `
{jt}
jfContent.md-list__item__avatar[select="md-avatar"] +
jfContent.md-list__item__support_icon[select="md-icon"] +
jfContent.md-list__item__content +
jfContent.md-list__item__meta[select="md-list-meta"] +
mdRipple
`;

exports.dependencies = {
    md_list_ctrl: "mdList",
};

exports.bindings = {
    is_selected: "<isSelected",
};

exports.controller = class MDListItem extends IMDListItem {
    on_init ($element) {
        this.$element = $element;
        super.init();

        $element.on("click", () => {
            this.md_list_ctrl.select(this);
        });
    }

    on_destroy () {
        this.md_list_ctrl.remove(this);
    }
};

exports.controller_name = "$md_list__item";
