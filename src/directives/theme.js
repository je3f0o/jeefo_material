/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : theme.js
* Created at  : 2019-12-02
* Updated at  : 2021-03-07
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

const media_query_list = window.matchMedia("(prefers-color-scheme: dark)");

exports.selector = "md-theme";
exports.bindings = {
    value : "@mdTheme"
};

exports.controller = class MDTheme {
    on_init ($element) {
        const observer = new Observer(this);
        this.$element = $element;

        $element.add_class("md-theme");
        this.is_dark = media_query_list.matches;
        this.is_auto = true;

        const theme_prefix = "md-theme";
        let theme_class_name;
        const on_name_change = (name, _, is_auto) => {
            if (theme_class_name) $element.remove_class(theme_class_name);

            switch (name) {
                case null:
                case undefined:
                case "" :
                case "auto" :
                    if (! this.on_darkness_changed) {
                        this.on_darkness_changed = () => {
                            this.is_dark = media_query_list.matches;
                            this.name    = this.is_dark ? "dark" : "light";
                            on_name_change(this.name, null, true);
                        };
                    }
                    this.on_darkness_changed();
                    name = this.name;
                    media_query_list.addListener(this.on_darkness_changed);
                    break;
                case "dark" :
                    if (! is_auto && this.on_darkness_changed) {
                        media_query_list.removeListener(this.on_darkness_changed);
                    }
                    this.is_dark = true;
                    break;
                case "light" :
                    if (! is_auto && this.on_darkness_changed) {
                        media_query_list.removeListener(this.on_darkness_changed);
                    }
                    this.is_dark = false;
                    break;
            }

            this.name        = name;
            theme_class_name = `${theme_prefix}--${name}`;
            $element.add_class(theme_class_name);
            $element.set_attr("md-theme", name);
            this.set_style(name);
            $element.trigger("change");
        };
        observer.on("value", on_name_change);
        on_name_change(this.value);

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

    set_style (name) {
        const theme = theme_service.themes.find(t => t.name === name);
        this.$element.css({
            color           : theme.vars["$on_background-color"],
            backgroundColor : theme.vars["$background-color"],
        });
    }
};

exports.controller_name = "$md_theme";
