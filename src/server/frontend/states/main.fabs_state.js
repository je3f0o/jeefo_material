/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.fabs_state.js
* Created at  : 2021-02-28
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
        mdTab(FAB) +
        mdTab(Extented) ^
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](No options) ^
    [jfClass="{ hide: $demo_box.index !== 0 }"] >
        mdButton[variant="fab"] >
            mdIcon[name="stars"]
        ^   ^
    [jfClass="{ hide: $demo_box.index !== 1 }"] >
        mdTypography[variant="subtitle-1"](Not completed yet)
`;

class MDButtonState {
    static get url      () { return "fabs"; }
    static get template () { return template;  }

    on_init () {
    }
}

module.exports = MDButtonState;
