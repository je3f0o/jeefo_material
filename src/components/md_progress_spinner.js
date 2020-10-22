/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_progress_spinner.js
* Created at  : 2019-12-24
* Updated at  : 2020-06-07
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

const style_el = document.createElement("style");
style_el.appendChild(document.createTextNode(''));
style_el.setAttribute("component-selectors", "[md-progress-spinner]");
document.head.appendChild(style_el);

const TAU            = Math.PI * 2;
const DEFAULT_WIDTH  = 4;
const DEFAULT_RADIUS = 18;
const DEFAULT_MARGIN = 2;

const INDETERMINATE_ANIMATION_TEMPLATE = `
@keyframes NAME {
  0%   { stroke-dasharray: 1, LENGTH; stroke-dashoffset: 0; }
  50%  { stroke-dasharray: MAX_ARRAY, LENGTH; stroke-dashoffset: MAX_OFFSET; }
  100% { stroke-dasharray: MAX_ARRAY, LENGTH; stroke-dashoffset: MIN_OFFSET; }
}
`;

const radiuses    = {};
const style_sheet = style_el.sheet;

const style = `
/* css */
@keyframes spin {
    to {
        transform: rotate(270deg);
    }
}
md-progress-spinner {
    display  : block;
    overflow : hidden;
}
md-progress-spinner svg {
    width     : 100%;
    height    : 100%;
    transform : rotate(-90deg);
}
md-progress-spinner circle {
    fill           : none;
    stroke         : currentColor;
    stroke-linecap : square;
}
md-progress-spinner.indeterminate svg {
    animation: spin 2s linear infinite;
}
md-progress-spinner.indeterminate circle {
    animation-duration        : 1.5s;
    animation-timing-function : cubic-bezier(.35,0,.25,1);
    animation-iteration-count : infinite;
}
`;

module.exports = {
	selector : "md-progress-spinner",
	template : `
        { jt }
        svg > circle[cx="50%" cy="50%"]
    `,
    style,

	bindings : {
		color         : '!',
		width         : '!',
		radius        : '!',
		margin        : '!',
		indeterminate : '<',
	},

	controller : class MDProgressSpinner {
        on_init ($element) {
            const $svg    = $element.children(0);
            const width   = this.width  || DEFAULT_WIDTH;
            const radius  = this.radius || DEFAULT_RADIUS;
            const margin  = this.margin || DEFAULT_MARGIN;
            const size    = (radius + width + margin) * 2;
            const length  = radius * TAU;
            const $circle = $svg.children(0);

            if (this.indeterminate) {
                const name = `md-progress-spinner-stroke-rotate-${ radius }`;
                $element.add_class("indeterminate");

                if (! radiuses[radius]) {
                    radiuses[radius] = true;

                    const max_array  = (length * 0.7);
                    const max_offset = max_array - length + 1;

                    style_sheet.insertRule(
                        // Animation should begin at 5% and end at 80%
                        INDETERMINATE_ANIMATION_TEMPLATE
                            .replace(/MAX_ARRAY/g, `${ max_array }px`)
                            .replace("MAX_OFFSET", `${ max_offset }px`)
                            .replace("MIN_OFFSET", `${ (length * -1 + 1) }px`)
                            .replace(/LENGTH/g, length)
                            .replace("NAME", name)
                    );
                }

                $circle.style("animationName", name);
            }
            $element.css({ width : `${ size }px`, height : `${ size }px` });

            $svg.DOM_element.setAttribute("viewBox", `0 0 ${size} ${size}`);
            $circle.css({
                r               : radius,
                strokeWidth     : `${ width }px`,
                strokeDasharray : `${ length }px`,
            });
        }
	},
};
