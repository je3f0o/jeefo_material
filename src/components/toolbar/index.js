/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_toolbar.js
* Created at  : 2019-07-18
* Updated at  : 2019-07-18
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
const inner_element  = JeefoDOMParser.parse(`{jt}md-surface`)[0];

const elevation = "elevation";

module.exports = {
    selector : "md-toolbar",
    style    : "#include style.sass",
    template (element) {
        const inner_el = inner_element.cloneNode();
        while (element.firstChild) {
            inner_el.appendChild(element.firstChild);
        }
        if (element.hasAttribute(elevation)) {
            inner_el.setAttribute(elevation, element.getAttribute(elevation));
            element.removeAttribute(elevation);
		}
        element.classList.add("md-toolbar");
        element.appendChild(inner_el);
    }
};
