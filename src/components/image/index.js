/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2021-03-08
* Updated at  : 2021-03-11
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

//const Observer      = require("@jeefo/observer");
//const theme_service = require("../../services/theme");
const {parse} = require("@jeefo/jqlite/dom_parser");

const img_el = parse(`{jt}img`)[0];

exports.selector = "md-image";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-image
    width   : 100%
    display : block

    &--loading
        padding-top : 52.6%
        background :
            size     : cover
            image    : url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20fill%3D%22%23E7E7E7%22%20d%3D%22M0%200h120v120H0z%22%2F%3E%3Cpath%20fill%3D%22%23B9B9B9%22%20d%3D%22M71.995%2067c.003.166.005.333.005.5C72%2079.926%2061.926%2090%2049.5%2090S27%2079.926%2027%2067.5%2037.074%2045%2049.5%2045c4.34%200%208.395%201.23%2011.832%203.359L72%2030l21.5%2037H71.995zm0%200c-.172-7.877-4.392-14.757-10.663-18.641L50.5%2067h21.495z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A)
            repeat   : no-repeat
            position : center

        > img
            display: none

    > img
        width: 100%
`;

/*
theme_service.set_default({
});

theme_service.register_template(`
/* sass /
@import '@jeefo/material'

.md-image
`);
*/

const img_attrs = ["src"];

exports.template = element => {
    const img = img_el.cloneNode();

    let i = element.attributes.length;
    while (i--) {
        const {name, value} = element.attributes[i];
        if (name.startsWith("on--") || img_attrs.includes(name)) {
            img.setAttribute(name, value);
            element.removeAttribute(name);
        }
    }

    element.classList.add("md-image", "md-image--loading");
    element.appendChild(img);
};

exports.bindings = {
};

exports.controller = class MDImage {
    on_init ($element) {
        const image = $element.DOM_element.firstChild;
        image.addEventListener("load", () => {
            $element.remove_class("md-image--loading");
        });
    }
};
