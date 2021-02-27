/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.selection_state.js
* Created at  : 2021-02-24
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

// ignore:end

const template = `
{jt}
demoBox >
    mdTabs >
        mdTab(Checkbox) +
        mdTab(Radio button) ^
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](Binary options) +
        mdSelection >
            mdCheckbox[value="is_disabled"] +
            label(is-disabled)
        ^   ^
    [jfClass="{ hide: $demo_box.index !== 0 }"] >
        mdSelection >
            mdCheckbox[isDisabled="is_disabled"] +
            label(Label)
        ^   ^
    [jfClass="{ hide: $demo_box.index !== 1 }"] >
        mdSelection[forEach="r in radio_buttons"] >
            mdRadio[
                name       = "rb"
                value      = "{{ r.value }}"
                isDisabled = "is_disabled"
            ] +
            label({{ r.label }})
`;

class MDSelectionState {
    static get url      () { return "selection"; }
    static get template () { return template;  }

    on_init () {
        this.color       = '';
        this.is_disabled = false;

        this.radio_buttons = [
            {label: "Label 1", value: 1},
            {label: "Label 2", value: 2},
        ];
    }
}

module.exports = MDSelectionState;
