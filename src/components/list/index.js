/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-10-07
* Updated at  : 2020-06-22
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

const KEY_ENTER      = 13;
const KEY_SPACE      = 32;
const KEY_ARROW_UP   = 38;
const KEY_ARROW_DOWN = 40;
const selected_class = "md-list__item--selected";
// ignore:end

const jqlite = require("@jeefo/jqlite");

const on_select = (element, $target) => {
    const selected = element.querySelector(`.${selected_class}`);
    if (selected !== $target.DOM_element) {
        if (selected) {
            selected.classList.remove(selected_class);
        }
        $target.add_class(selected_class);
    }
    $target.trigger("select");
};

class MDList {
    on_init ($element) {
        $element.add_class("md-list");

        const {DOM_element: element} = $element;

        $element.on("keydown", event => {
            switch (event.keyCode) {
                case KEY_ARROW_UP   :
                    event.preventDefault();
                    const focused_item = element.querySelector("[tabindex='0']");
                    let prev = focused_item.previousElementSibling;
                    while (prev && prev.tagName === "MD-LIST-DIVIDER") {
                        prev = focused_item.previousElementSibling;
                    }
                    if (prev) {
                        focused_item.setAttribute("tabindex", -1);
                        prev.setAttribute("tabindex", 0);
                        prev.focus();
                    }
                    break;
                case KEY_ARROW_DOWN : {
                    event.preventDefault();
                    const focused_item = element.querySelector("[tabindex='0']");
                    let next = focused_item.nextElementSibling;
                    while (next && next.tagName === "MD-LIST-DIVIDER") {
                        next = focused_item.nextElementSibling;
                    }
                    if (next) {
                        focused_item.setAttribute("tabindex", -1);
                        next.setAttribute("tabindex", 0);
                        next.focus();
                    }
                    break;
                }
                case KEY_ENTER:
                case KEY_SPACE:
                    event.preventDefault();
                    on_select(element, $element.first("[tabindex='0']"));
                    break;
            }
        });

        $element.on("click", event => {
            let el = event.target;

            while (element.contains(el) && el !== element) {
                const is_list_item = (
                    el.classList.contains("md-list__item") &&
                    el.parentNode === element
                );
                if (is_list_item) {
                    on_select(element, jqlite(el));
                    break;
                }
                el = el.parentNode;
            }
        });
    }
}

module.exports = {
    selector : "md-list",

    style : "#include style.sass",

    template : `
        { jt }
        jfContent[select="md-list-item"] +
        jfContent[select="md-list-divider"]
    `,

    controller : MDList
};
