/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : emphasis.js
* Created at  : 2021-02-07
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

const Observer       = require("@jeefo/observer");
const md_theme       = require("../services/theme");
const Color          = require("../utils/color");
const class_modifier = require("../utils/class_modifier");

const root = "md-emphasis";

const emphasis_values = {
    high     : 0.87,
    medium   : 0.6,
    disabled : 0.38,
};

const set_color = (element, {fg, bg}, alpha) => {
    if (alpha) {
        const color = Color.blend(bg, fg, alpha);
        element.style.color = color.toString();
    }
};

const get_colors = ({surface, theme, $element}) => {
    let bg, fg;
    if (theme) {
        const $theme = theme.$element;
        theme = md_theme.themes.find(t => t.name === theme.name);
        if (! theme) throw new Error("Invalid theme.");

        if (surface && surface.is_closer($theme)) {
            const target = surface.$element.DOM_element;
            const color  = target.style.color;
            if (color) target.style.color = null;
            const style = getComputedStyle(target);

            bg = new Color(style.backgroundColor);
            fg = new Color(style.color);
            if (color) target.style.color = color;
        } else {
            bg = new Color(theme.colors.background);
            fg = new Color(theme.colors.on_background);
        }
    } else {
        const style = getComputedStyle($element.DOM_element);
        bg = new Color(style.backgroundColor);
        fg = new Color(style.color);
    }

    return {fg, bg};
};

exports.dependencies = {
    theme   : "?mdTheme",
    surface : "?mdSurface",
};

exports.bindings = {
    emphasis: "@mdEmphasis",
};

exports.controller = class MDEmphasis {
    on_init ($element) {
        const el       = $element.DOM_element;
        const observer = new Observer(this);
        let colors, is_rendered;
        this.$element = $element;
        $element.add_class(root);

        const emphasises = ["high", "medium", "disabled"];
        const set_class = class_modifier(el, root, emphasises);
        observer.on("emphasis", value => {
            if (is_rendered) {
                if (value) {
                    set_color(el, colors, emphasis_values[value]);
                } else {
                    $element.style("color", null);
                }
            }
            set_class();
        });
        set_class(this.emphasis);

        $element.on("render", () => {
            colors = get_colors(this);
            set_color(el, colors, emphasis_values[this.emphasis]);
            is_rendered = true;
        });

        if (this.theme) {
            this.on_theme_change = this.theme.$element.on("change", () => {
                if (is_rendered) {
                    colors = get_colors(this);
                    set_color(el, colors, emphasis_values[this.emphasis]);
                }
            });
        }
    }

    on_destroy () {
        if (this.theme) {
            this.theme.$element.off("change", this.on_theme_change);
        }
    }
};

exports.controller_name = "$md_emphasis";
