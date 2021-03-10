/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : link.js
* Created at  : 2021-01-19
* Updated at  : 2021-03-07
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

const IMDListItem      = require("./event_handler");
const {parse, replace} = require("@jeefo/jqlite/dom_parser");

const anchor = parse(`{jt}a`)[0];
const ripple = parse(`{jt}mdRipple`)[0];

exports.selector = "md-list-link";

exports.template = element => {
    element.classList.add("md-list__item", "md-list__link");
    element.appendChild(ripple.cloneNode());
    return replace(element, anchor.cloneNode());
};

exports.dependencies = {
    md_list_ctrl: "mdList",
};

exports.bindings = {
    isFocused : '=',
    isSelected: '=',
};

exports.controller = class MDListLink extends IMDListItem {
    on_init ($element) {
        this.$element = $element;
        super.init();

        //$element.on("click", () => { this.md_list_ctrl.select(this); });
    }
};
