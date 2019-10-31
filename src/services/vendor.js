/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : vendor.js
* Created at  : 2019-10-07
* Updated at  : 2019-10-08
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

const dash_case  = require("@jeefo/utils/string/dash_case");
const capitalize = require("@jeefo/utils/string/capitalize");

const styles          = window.getComputedStyle(document.documentElement);
const supported_props = {};

const vendors = ["webkit", "moz", "ms", "o"].map(prefix => {
    return {
        js_prefix  : prefix,
        css_prefix : prefix === "ms" ? "ms-" : `-${ prefix }-`,
    };
});

let vendor;

let i = styles.length;
while (i--) {
    const prop = styles[i];
    const _vendor = vendors.find(vendor => {
        return prop.startsWith(vendor.css_prefix);
    });
    if (_vendor) {
        vendor = _vendor;
        break;
    }
}

class MDVendorService {
    //constructor () { }

    has_support (property) {
        if (! (property in supported_props)) {
            if (property in styles) {
                supported_props[property] = dash_case(property);
                return true;
            }

            const { js_prefix, css_prefix } = vendor;
            const prefixed_prop = `${ js_prefix }${ capitalize(property) }`;
            if (! (prefixed_prop in supported_props)) {
                if (prefixed_prop in styles) {
                    const _prop = dash_case(property);
                    supported_props[property] = `${ css_prefix }${_prop}`;
                } else {
                    supported_props[property] = null;
                }
            }
        }

        return supported_props[property] !== null;
    }

    prefix (property, value) {
        if (this.has_support(property)) {
            return `${ supported_props[property] } : ${ value };`;
        }
        return '';
    }
}

module.exports = new MDVendorService();
