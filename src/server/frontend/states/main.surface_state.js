/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.surface_state.js
* Created at  : 2021-01-19
* Updated at  : 2021-02-04
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
        [style="padding: 8px 0 4px 10px; color: #666;"](Color) +
        mdSelection >
            mdRadio[
                name       = "color"
                color      = "primary"
                value      = ""
                isSelected = "color === ''"
                (change)   = "color = $element.value"
            ] +
            label(Default) ^
        mdSelection >
            mdRadio[
                name       = "color"
                color      = "primary"
                value      = "primary"
                isSelected = "color === 'primary'"
                (change)   = "color = $element.value"
            ] +
            label(Primary) ^
        mdSelection >
            mdRadio[
                name       = "color"
                color      = "primary"
                value      = "secondary"
                isSelected = "color === 'secondary'"
                (change)   = "color = $element.value"
            ] +
            label(Secondary)
        ^   ^
        mdSurface.demo-surface[
            color="{{ color }}"
        ](Content)
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
