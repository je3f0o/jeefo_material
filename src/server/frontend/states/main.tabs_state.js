/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.tabs_state.js
* Created at  : 2021-02-05
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

const template = `
{jt}
demoBox >
    mdTabs >
        mdTab(Fixed) +
        mdTab(Scrollable) ^
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](Not completed yet) ^
    [
        style   = "width: 100%; padding: 0 16px; box-sizing: border-box;"
        jfClass = "{ hide: $demo_box.index !== 0 }"
    ] >
        mdTabs[color="{{ color }}"] >
            mdTab(tab one) +
            mdTab(tab two) +
            mdTab(tab three)
        ^   ^
    [
        style   = "width: 100%; padding: 0 16px; box-sizing: border-box; text-align: center;"
        jfClass = "{ hide: $demo_box.index !== 1 }"
    ] >
        mdTypography[variant="subtitle-1"](Not completed yet)
`;

class MDTabsState {
    static get url      () { return "tabs"; }
    static get template () { return template;  }

    on_init () {
        this.color = '';
    }
}

module.exports = MDTabsState;
