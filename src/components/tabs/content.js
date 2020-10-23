/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : content.js
* Created at  : 2019-07-05
* Updated at  : 2020-10-23
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

const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");

const content = JeefoDOMParser.parse(`{jt} div`)[0];

const replace_element = (old_element, new_element) => {
    for (const attr of old_element.attributes) {
        new_element.setAttribute(attr.name, attr.value);
    }
    while (old_element.firstChild) {
        new_element.appendChild(old_element.firstChild);
    }
    return new_element;
};

module.exports = {
    selector : "md-tab-content",
    template (element) {
        const new_element = replace_element(element, content.cloneNode());
        new_element.classList.add("md-tabs__body__content");
        return new_element;
    }
};
