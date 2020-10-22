/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-08-01
* Updated at  : 2020-08-02
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
const inner_element  = JeefoDOMParser.parse(`{jt}.md-surface__inner`)[0];

const elev = "elevation";

module.exports = {
    selector : "md-surface",

    style : "#include style.sass",

    template (element) {
        const inner_el = inner_element.cloneNode();
        while (element.firstChild) {
            inner_el.appendChild(element.firstChild);
        }
        if (element.hasAttribute(elev)) {
            inner_el.setAttribute("md-elevation", element.getAttribute(elev));
            element.removeAttribute(elev);
		}
        element.classList.add("md-surface");
        element.appendChild(inner_el);
    },
};
