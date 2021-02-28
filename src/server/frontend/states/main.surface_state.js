/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.surface_state.js
* Created at  : 2021-01-19
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

const style = `
/* sass */
@import '@jeefo/material'

.demo-surface
    +size(128px)
    +flex-center
`;

const template = `
{jt}
demoBox >
    mdTabs >
        mdTab(Surface) ^
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](Color) +
        mdSelection[forEach="c in colors"] >
            mdRadio[
                name       = "color"
                value      = "{{ c.value }}"
                isSelected = "color === c.value"
                (change)   = "color = $element.value"
            ] +
            label({{ c.label }})
        ^   ^
    mdSurface.demo-surface[color="{{ color }}"](Content)
`;

class MDSurfaceState {
    static get url      () { return "surface"; }
    static get style    () { return style; }
    static get template () { return template;  }

    on_init () {
        this.color = '';
    }
}

module.exports = MDSurfaceState;
