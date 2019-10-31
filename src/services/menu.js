/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : menu.js
* Created at  : 2019-10-08
* Updated at  : 2019-10-11
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

const compile            = require("@jeefo/component/compiler");
const jeefo_template     = require("@jeefo/template");
const StructureComponent = require("@jeefo/component/structure_component");

const { min }          = Math;
const vertical_padding = 8;
const menu_padding     = vertical_padding * 2;
const option_height    = 48;

const root = new StructureComponent("container", {
    Controller : class MDMenuServiceContainer {}
});

const calc_menu_height = options => {
    return (options.length * option_height) + menu_padding;
};

const calc_menu_style = (options, rect) => {
    const { innerHeight }  = window;
    const potential_height = calc_menu_height(options);

    let y = rect.y + rect.height;
    y = min(y, innerHeight - potential_height - option_height);

    const height = min(potential_height, innerHeight - menu_padding);

    return { y, height };
};

let release      = null;
let is_activated = false;

class MDMenuService {
    get is_activated () { return is_activated; }

    async show (options, menu_options) {
        const { rect } = menu_options;
        const menu_style = calc_menu_style(options, rect);

        rect.menu_y      = menu_style.y;
        rect.menu_height = menu_style.height - vertical_padding;

        root.controller.rect   = rect;
        root.controller.select = index => {
            options[index].selected = true;
            root.children.forEach(child => child.destroy());
            release(options[index].value);
        };
        root.controller.options = options;

        const style = {
            top             : `${ menu_style.y }px`,
            left            : `${ rect.x }px`,
            width           : `${ rect.width }px`,
            height          : `${ menu_style.height }px`,
            overflow        : "hidden",
            position        : "absolute",
            "z-index"       : 2,
            background      : "#121212",
            "border-radius" : "0 0 4px 4px",
        };
        const bg_style = Object.keys(style).map(prop => {
            return `${ prop }: ${ style[prop] }`;
        }).join("; ");

        const template_node = jeefo_template.parse(`
            { jt }
            mdMenu[rect="rect"] >
                .md-menu-background[style="${ bg_style };"] >
                    mdList[mdElevation="1"] >
                        mdListItem[
                            (click) = "select($index)"
                            forEach = "option in options"
                        ]({{ option.text }})
        `.replace("{{", "${").replace("}}", '}'));

        const elements = await compile(template_node, root);
        document.body.appendChild(elements[0]);
        root.children.forEach(child => child.trigger_renderable());

        return new Promise(resolve => {
            release = (value = null) => {
                release      = null;
                is_activated = false;
                resolve(value);
            };

            is_activated = true;
            elements[0].addEventListener("destroy", () => release());
        });
    }

    cancel () {
        if (is_activated) {
            root.children.forEach(child => child.destroy());
            release();
        }
    }
}

module.exports = new MDMenuService();
