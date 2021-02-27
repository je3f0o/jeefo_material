/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_theme.js
* Created at  : 2019-12-02
* Updated at  : 2021-02-28
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
const md_media      = require("../services/media");
const theme_service = require("../services/theme");

exports.selector = "md-theme";
exports.bindings = {
    name : "@mdTheme"
};

exports.controller = class MDTheme {
    on_init ($element) {
        const observer = new Observer(this);
        this.$element = $element;

        $element.add_class("md-theme");

        const theme_prefix = "md-theme";
        let theme_class_name;
        const on_name_change = value => {
            if (theme_class_name) $element.remove_class(theme_class_name);

            if (value) {
                theme_class_name = `${theme_prefix}--${value}`;
                $element.add_class(theme_class_name);
                $element.set_attr("md-theme", value);
                this.set_style();
                $element.trigger("change");
            }
        };
        observer.on("name", on_name_change);
        on_name_change(this.name);

        // Viewport breakpoint
        const viewport_prefix = `${theme_prefix}--viewport`;
        let viewport_class_name;
        const on_viewport_change = value => {
            if (viewport_class_name) $element.remove_class(viewport_class_name);

            viewport_class_name = `${viewport_prefix}--${value}`;
            $element.add_class(viewport_class_name);
            $element.digest();
        };
        md_media.on("breakpoint_changed", on_viewport_change);
        on_viewport_change(md_media.breakpoint);
    }

    is (value) { return md_media.is(value); }

    set_style () {
        const theme = theme_service.themes.find(t => this.name === t.name);
        this.$element.css({
            color           : theme.vars["$on_background-color"],
            backgroundColor : theme.vars["$background-color"],
        });
    }
};

exports.controller_name = "$md_theme";
