/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : link.js
* Created at  : 2021-01-19
* Updated at  : 2021-02-18
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
const event_handler  = require("./event_handler");
const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");

const anchor = JeefoDOMParser.parse(`{jt}a`)[0];
const ripple = JeefoDOMParser.parse(`{jt}mdRipple`)[0];

exports.selector = "md-list-link";

exports.template = element => {
    element.classList.add("md-list__item", "md-list__link");
    element.appendChild(ripple.cloneNode());
    return JeefoDOMParser.replace(element, anchor.cloneNode());
};

exports.dependencies = {
    md_list_ctrl: "mdList",
};

exports.bindings = {
    isFocused : '=',
    isSelected: '=',
};

exports.controller = class MDListLink {
    on_init ($element) {
        const observer = new Observer(this);

        this.$element = $element;
        this.md_list_ctrl.add(this);

        const {DOM_element} = $element;

        const on_focused = is_focused => {
            if (is_focused) DOM_element.focus();
        };

        observer.on("isFocused", on_focused);
        on_focused(this.isFocused);

        //event_handler(this, $element, this.md_list_ctrl.items);
    }
};
