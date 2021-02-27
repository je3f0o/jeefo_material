/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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
    require("./first_element_child");
}
if (! ("path" in Event.prototype)) {
    Object.defineProperty(Event.prototype, "path", {
        get () { return this.composedPath(); }
    });
}
