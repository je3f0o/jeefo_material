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

//const JeefoDOMParser = require("@jeefo/jqlite/dom_parser");
//const inner_element  = JeefoDOMParser.parse(`{jt}md-surface`)[0];

//const elevation = "elevation";

exports.selector = "md-toolbar";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-toolbar
    $line-height        : 40px
    $vertical-padding   : 8px
    $horizontal-padding : 16px

    height         : $line-height
    padding        : $vertical-padding $horizontal-padding
    display        : flex
    font-size      : 20px
    line-height    : $line-height
    //flex-direction : column

    //> .md-surface > .md-surface__inner
        //+rel
        +flex-v-center
        height      : $line-height + $vertical-padding * 2
        padding     : $vertical-padding $horizontal-padding
`;

exports.template = element => {
    /*
    const inner_el = inner_element.cloneNode();
    while (element.firstChild) {
        inner_el.appendChild(element.firstChild);
    }
    if (element.hasAttribute(elevation)) {
        inner_el.setAttribute(elevation, element.getAttribute(elevation));
        element.removeAttribute(elevation);
    }
    element.appendChild(inner_el);
    */
    element.classList.add("md-toolbar");
};
