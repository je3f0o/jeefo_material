 jeefo.register("./polyfills/first_element_child.js", async (exports, module) => { const __dirname = "./polyfills", __filename = "./polyfills/first_element_child.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : first_element_child.js
* Created at  : 2020-12-29
* Updated at  : 2020-12-29
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

const {prototype}    = (window.Element || window.Node);
const {ELEMENT_NODE} = window.Node;

// Overwrites native 'firstElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
Object.defineProperty(prototype, "firstElementChild", {
    get () {
        for (const node of this.childNodes) {
            if (node.nodeType === ELEMENT_NODE) return node;
        }
        return null;
    }
});
 }); 
//# sourceURL=./polyfills/first_element_child.js 