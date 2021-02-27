/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-06-23
* Updated at  : 2021-02-26
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";
/* globals*/
/* exported*/

const WAVE_CLASS           = "md-ripple__wave";
const ACTIVATED_WAVE_CLASS = "md-ripple__wave--activated";
const REMOVABLE_WAVE_CLASS = "md-ripple__wave--removable";

// ignore:end

const {max, sqrt} = Math;

module.exports = {
    selector : "md-ripple",
    style : `
        /* sass */
        @import '@jeefo/material'
        @import './style'

        .md-ripple
            +ripple
    `,
    template (element) {
        if (element.firstChild) {
            throw new Error("MDRipple shouldn't contain any child");
        }
        element.classList.add("md-ripple");
    },
    bindings : {
    },
    controller : class MDRipple {
        on_init ($element) {
            let active_ripple;

            const on_mouse_up = function () {
                if (event.button === 0 && active_ripple) {
                    if (active_ripple.is_removable) {
                        $element.DOM_element.removeChild(active_ripple);
                    } else {
                        active_ripple.is_removable = true;
                    }
                    active_ripple = null;
                }
            };

            $element.on("mouseup"    , on_mouse_up);
            $element.on("mouseleave" , on_mouse_up);

            const on_mousedown = event => {
                if (event.button !== 0) { return; }

                let x, y;
                if (event.srcElement === $element.DOM_element) {
                    x = event.offsetX;
                    y = event.offsetY;
                } else {
                    const {left, top} = $element.rect();
                    x = event.clientX - left;
                    y = event.clientY - top;
                }

                const width    = max($element.width  - x, x);
                const height   = max($element.height - y, y);
                const diameter = sqrt(width*width + height*height) * 2;

                const ripple = document.createElement("div");
                ripple.style.top    = `${y}px`;
                ripple.style.left   = `${x}px`;
                ripple.style.width  = `${diameter}px`;
                ripple.style.height = `${diameter}px`;
                ripple.classList.add(WAVE_CLASS);

                $element.append(ripple);
                ripple.getBoundingClientRect();
                ripple.classList.add(ACTIVATED_WAVE_CLASS);
                active_ripple = ripple;

                const {transitionDuration} = getComputedStyle(active_ripple);
                setTimeout(() => {
                    if (! $element.DOM_element) return;
                    if (ripple.is_removable) {
                        $element.DOM_element.removeChild(ripple);
                    } else {
                        ripple.is_removable = true;
                    }
                }, parseFloat(transitionDuration) * 1000);
            };

            $element.on("mousedown" , on_mousedown);
            $element.on("touchstart", on_mousedown);
        }
    }
};
