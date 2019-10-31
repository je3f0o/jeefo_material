/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : prefixer.js
* Created at  : 2019-10-07
* Updated at  : 2019-10-07
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

const capitalize = require("@jeefo/utils/string/capitalize");

const styles          = window.getComputedStyle(document.documentElement);
const supported_props = {};

let vendor;
const vendors = ["webkit", "moz", "ms", "o"];

module.exports = (property, value) => {
    if (! (property in supported_props)) {
        if (property in styles) {
            supported_props[property] = property;
        } else {
            const capitalized_property = capitalize(property);
            if (! vendor) {
                const js = vendors.find(vendor => {
                    return `${ vendor }${ capitalized_property }` in styles;
                });
                if (js) {
                    const css = js === "ms" ? "ms-" : `-${ js }-`;
                    vendor = { css, js };
                }
            }
            if (vendor) {
                const prefixed_prop = `${vendor.js}${capitalized_property}`;
                if (! (prefixed_prop in supported_props)) {
                    if (prefixed_prop in styles) {
                        supported_props[property] = `${vendor.css}${property}`;
                    } else {
                        supported_props[property] = null;
                    }
                }
            }
        }
    }

    if (supported_props[property]) {
        return `${ supported_props[property] } : ${ value };`;
    }
};
