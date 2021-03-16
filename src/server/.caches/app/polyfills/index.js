 jeefo.register("./polyfills/index.js", async (exports, module) => { const __dirname = "./polyfills", __filename = "./polyfills/index.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-12-29
* Updated at  : 2021-02-22
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

if (! ("firstElementChild" in window.Node.prototype)) {
    (await require("./first_element_child"));
}
if (! ("path" in Event.prototype)) {
    Object.defineProperty(Event.prototype, "path", {
        get () { return this.composedPath(); }
    });
}
 }); 
//# sourceURL=./polyfills/index.js 