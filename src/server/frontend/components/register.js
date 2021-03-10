/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : register.js
* Created at  : 2021-01-07
* Updated at  : 2021-03-08
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

const for_each            = require("@jeefo/utils/object/for_each");
const {definitions_table} = require("@jeefo/component");

//require("@jeefo/material/attributes/md_layout");
//require("@jeefo/material/attributes/md_elevation");

const components = {
    "md-icon"              : "@jeefo/material/components/md_icon",
    "md-button"            : "@jeefo/material/components/button",
    "md-card"              : "@jeefo/material/components/card",
    "md-sidenav"           : "@jeefo/material/components/sidenav",
    "md-sidenav-container" : "@jeefo/material/components/sidenav/container",
    "md-toolbar"           : "@jeefo/material/components/toolbar",
    "md-scrollable"        : "@jeefo/material/components/scrollable",
    "md-input"             : "@jeefo/material/components/input",
    "md-input-container"   : "@jeefo/material/components/input",
    "option"               : "@jeefo/material/components/option",
    "md-surface"           : "@jeefo/material/components/surface",
    "md-menu"              : "@jeefo/material/components/md_menu",
    "md-list"              : "@jeefo/material/components/list",
    "md-list-item"         : "@jeefo/material/components/list/item",
    "md-list-meta"         : "@jeefo/material/components/list/meta",
    "md-list-link"         : "@jeefo/material/components/list/link",
    "md-progress-spinner"  : "@jeefo/material/components/md_progress_spinner",
    "md-tabs"              : "@jeefo/material/components/tabs",
    "md-ripple"            : "@jeefo/material/components/ripple",
    "md-divider"           : "@jeefo/material/components/divider",
    "md-link"              : "@jeefo/material/components/link",
    "md-radio"             : "@jeefo/material/components/radio",
    "md-image"             : "@jeefo/material/components/image",
    "md-checkbox"          : "@jeefo/material/components/checkbox",
    "md-selection"         : "@jeefo/material/components/selection",
    "md-typography"        : "@jeefo/material/components/typography",

    "md-app-bar"           : "@jeefo/material/components/appbar",

    // MD Collapse
    "md-collapse"          : "@jeefo/material/components/collapse",

    "demo-box"             : `${__dirname}/demo_box`,
};

for_each(components, (selector, path) => {
    definitions_table.register_component(selector, path);
});
