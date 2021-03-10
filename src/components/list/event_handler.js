/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : event_handler.js
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

const KEY_ENTER      = 13;
const KEY_SPACE      = 32;
const KEY_ARROW_UP   = 38;
const KEY_ARROW_DOWN = 40;
const focused_class  = "md-list__item--focused";
// ignore:end

const Interface = require("@jeefo/utils/class/interface");

class IMDListItem extends Interface {
    constructor () {
        super(IMDListItem);
    }

    init () {
        const {items}       = this.md_list_ctrl;
        const {DOM_element} = this.$element;
        this.$element.add_class("md-list__item");
        this.md_list_ctrl.add(this);

        DOM_element.addEventListener("blur", () => {
            DOM_element.classList.remove(focused_class);
        });

        DOM_element.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case KEY_ARROW_UP   :
                    event.preventDefault();
                    let index = items.indexOf(this);
                    if (index > 0) this.md_list_ctrl.focus(items[index-1]);
                    break;
                case KEY_ARROW_DOWN : {
                    event.preventDefault();
                    let index = items.indexOf(this);
                    if (index + 1 < items.length) {
                        this.md_list_ctrl.focus(items[index+1]);
                    }
                    break;
                }
                case KEY_ENTER:
                    this.md_list_ctrl.select(this);
                    break;
                case KEY_SPACE:
                    event.preventDefault();
                    if (DOM_element.tagName === "A") {
                        DOM_element.click();
                    }
                    break;
            }
        });
    }
}

module.exports = IMDListItem;
