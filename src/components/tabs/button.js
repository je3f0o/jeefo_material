/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : button.js
* Created at  : 2019-07-05
* Updated at  : 2020-06-25
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

const jeefoDOMParser = require("@jeefo/component/dom_parser");

const button = jeefoDOMParser.parse(`
{jt}
button.md-tabs__button[type="button" tabindex="-1"] >
    .md-tabs__button__content +
    .md-tabs__button__indicator +
    mdRipple
`)[0];

module.exports = {
    selector : "md-tab-button",
    template (element) {
        const btn     = button.cloneNode(true);
        const content = btn.firstChild;
        for (const attr of element.attributes) {
            content.setAttribute(attr.name, attr.value);
        }
        while (element.firstChild) {
            content.appendChild(element.firstChild);
        }
        return btn;
    },
};
