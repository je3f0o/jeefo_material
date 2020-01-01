/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_theme.js
* Created at  : 2019-12-02
* Updated at  : 2019-12-06
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

const Observer      = require("@jeefo/observer");
const theme_service = require("../services/theme");

const prop_name = Symbol("name");

exports.selector = "md-theme";
exports.bindings = {
    [prop_name] : "@mdTheme"
};

exports.controller = function ($element) {
    const name     = this[prop_name];
    const observer = new Observer(this);

    const on_name_change = name => {
        if (theme_service[name]) {
            this.md_theme = theme_service[name];
        } else {
            delete this.md_theme;
        }
    };

    observer.on(prop_name, on_name_change);
    on_name_change(name);

    $element.add_class(`md-theme-${ name }`);
};
