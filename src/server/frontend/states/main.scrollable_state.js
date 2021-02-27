/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.scrollable_state.js
* Created at  : 2021-01-19
* Updated at  : 2021-01-19
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
`;

const template = `
{jt}
.box >
    h1(mdScrollable)
`;

class MDScrollableState {
    static get url      () { return "scrollable"; }
    static get style    () { return style;     }
    static get template () { return template;  }

    async on_init ($element) {
    }

    on_destroy () {
    }
}

module.exports = MDScrollableState;
