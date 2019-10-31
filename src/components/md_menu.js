/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_menu.js
* Created at  : 2019-10-08
* Updated at  : 2019-10-09
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

const vendor   = require("@jeefo/material/services/vendor");
const for_each = require("@jeefo/utils/object/for_each");
const position = require("@jeefo/material/utils/position_style");

const generate_backdrop_styles = rect => {
    return {
        top : {
            left   : `${ rect.x }px`,
            width  : `${ rect.width }px`,
            height : `${ rect.y }px`,
        },
        left  : { width : `${ rect.x }px` },
        right : {
            left  : `${ rect.x + rect.width }px`,
            width : `${ rect.x }px`,
        },
        bottom : {
            top   : `${ rect.menu_y + rect.menu_height }px`,
            left  : `${ rect.x }px`,
            width : `${ rect.width }px`,
        },
    };
};

const prop_rect = Symbol("rect");

module.exports = {
    selector : "md-menu",

    style : `
        /* css */
        /*
        md-menu {
            z-index : 9999;
            ${ position.fix(0) }
            ${ vendor.prefix("userSelect", "none") }
        }
        */
        .top-backdrop, .left-backdrop, .right-backdrop, .bottom-backdrop {
            z-index          : 1;
            position         : fixed;
            background-color : rgba(0,0,0, .38);
        }
        .top-backdrop {
            top : 0;
        }
        .left-backdrop {
            top    : 0;
            left   : 0;
            bottom : 0;
        }
        .right-backdrop {
            top    : 0;
            right  : 0;
            bottom : 0;
        }
        .bottom-backdrop {
            bottom: 0;
        }
    `,

    template : `
        { jt }
        .top-backdrop[(click)="destroy()"] +
        .left-backdrop[(click)="destroy()"] +
        .right-backdrop[(click)="destroy()"] +
        .bottom-backdrop[(click)="destroy()"] +
        jfContent
    `,

    bindings : {
        [prop_rect] : "<rect",
    },

    controller : class MDMenu {
        on_init ($element) {
            const rect   = this[prop_rect];
            const styles = generate_backdrop_styles(rect);
            for_each(styles, (prop, style, i) => {
                $element.children(i).css(style);
            });
            this.$element = $element;
        }

        destroy () {
            this.$element.trigger("destroy");
        }
    }
};
