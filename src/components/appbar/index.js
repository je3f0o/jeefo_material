/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : app_bar.js
* Created at  : 2021-01-14
* Updated at  : 2021-01-21
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

const TranscludeController = require("@jeefo/component/transclude_controller");

const transcluder = new TranscludeController(`
{ jt }
mdSurface[color="{{$md_app_bar.color}}"] >
    jfContent
`);

exports.style = `
/* sass */
.md-app-bar
    display: block
`;

exports.template = element =>  {
    element.setAttribute("md-elevation", 4);
    element.classList.add("md-app-bar");
    transcluder.transclude(element);
};

exports.bindings = {
    color : '@',
};

exports.controller = class MDAppBar {
    on_init () {
    }
};

exports.controller_name = "$md_app_bar";
