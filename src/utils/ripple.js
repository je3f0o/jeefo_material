/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : ripple.js
* Created at  : 2019-12-15
* Updated at  : 2019-12-31
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

const jqlite = require("@jeefo/jqlite");
const styles = require("@jeefo/component/styles");
//const remove = require("@jeefo/utils/array/remove");

const { max, sqrt }    = Math;
const DURATION         = 450;
const CSS_DURATION     = (DURATION * 2) / 1e3;
//const LEAVING_DURATION = DURATION * 0.35;

styles.add_style(`
/* css */
@keyframes md-ripple-remove {
    from { opacity : .15; }
    to   { opacity : 0;   }
}

.md-ripple-container:before {
    top              : 0;
    left             : 0;
    width            : 100%;
    height           : 100%;
    content          : '';
    opacity          : 0;
    position         : absolute;
    transition       : opacity .55s cubic-bezier(.25,.8,.25,1);
    pointer-events   : none;
    background-color : currentColor;
}
.md-ripple-container-hovered > .md-ripple-container:before {
    opacity : .1;
}
.md-ripple {
    opacity          : 0.2;
    position         : absolute;
    transform        : translate(-50%,-50%) scale(0);
    border-radius    : 50%;
    transform-origin : 50% 50%;
    background-color : currentColor;

    transition-duration        : ${CSS_DURATION}s;
    transition-property        : opacity, transform;
    transition-timing-function : cubic-bezier(.25,.8,.25,1);
}
.md-ripple.md-ripple-active {
    transform : translate(-50%,-50%) scale(1);
}
.md-ripple.md-ripple-remove {
    animation : md-ripple-remove ${CSS_DURATION}s cubic-bezier(.25,.8,.25,1);
}
`, { "md-utils" : "ripple" });

class MDRipple {
    constructor ($element, options) {
        this.options    = options;
        this.$element   = $element;
        this.$container = jqlite('<div class = "md-ripple-container"></div>');
        $element.append(this.$container);

        const on_mouse_up = () => {
            const { $ripple } = this;
            if ($ripple) {
                $ripple.add_class("md-ripple-remove");
                setTimeout(() => $ripple.remove(), DURATION);
                this.$ripple = null;
            }
        };

        $element.on("mouseenter", () => {
            $element.add_class("md-ripple-container-hovered");
        });
        $element.on("mouseleave", () => {
            $element.remove_class("md-ripple-container-hovered");
        });

		$element.on("mousedown", event => {
            event.stopPropagation();

            if (event.srcElement === $element.DOM_element) {
                this.create_ripple(event.offsetX, event.offsetY);
            } else {
                const { left, top } = $element.rect();
                this.create_ripple(event.clientX - left, event.clientY - top);
            }
        });

		$element.on("mouseup", on_mouse_up);
		$element.on("mouseleave", on_mouse_up);
    }

	create_ripple (x, y) {
        const { $element } = this;
        const width  = max($element.width  - x, x);
        const height = max($element.height - y, y);
        const diameter = sqrt(width*width + height*height) * 2;

        const styles = [
            `top:${y}px`,
            `left:${x}px`,
            `width:${diameter}px`,
            `height:${diameter}px`,
        ].join(';');

        const $ripple = jqlite(
            `<div class="md-ripple" style="${styles};"></div>`
        );

		this.$ripple = $ripple;
		this.$container.append($ripple);

		setTimeout(() => $ripple.add_class("md-ripple-active"));
	}
}

module.exports = MDRipple;
