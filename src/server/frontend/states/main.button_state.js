/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.button_state.js
* Created at  : 2021-02-24
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
        mdTab(Normal button) +
        mdTab(Icon) ^
    attributes >
        [jfClass="{ hide: $demo_box.index !== 0 }"] >
            .demo-box__attr-title[mdEmphasis="high"](Binary options) +
            mdSelection >
                mdCheckbox[value="is_disabled"] +
                label(is-disabled) ^
            .demo-box__attr-title[mdEmphasis="high"](Variant) +
            mdSelection[forEach="v in variants"] >
                mdRadio[
                    name       = "variant"
                    value      = "{{ v.value }}"
                    isSelected = "variant === v.value"
                    (change)   = "variant = $element.value"
                ] +
                label({{ v.label }})
            ^   ^
        [jfClass="{ hide: $demo_box.index !== 1 }"] >
            .demo-box__attr-title[mdEmphasis="high"](Binary options) +
            mdSelection >
                mdCheckbox[value="is_disabled"] +
                label(is-disabled)
            ^   ^
        [jfClass="{ hide: $demo_box.index !== 2 }"] >
            .demo-box__attr-title[mdEmphasis="high"](No options) +
        ^   ^
    [jfClass="{ hide: $demo_box.index !== 0 }"] >
        mdButton[variant="{{ variant }}" isDisabled="is_disabled"](Button) ^
    [jfClass="{ hide: $demo_box.index !== 1 }"] >
        mdButton[variant="icon" isDisabled="is_disabled"] >
            mdIcon[name="stars"]
`;

class MDButtonState {
    static get url      () { return "buttons"; }
    static get template () { return template;  }

    on_init () {
        this.variant     = '';
        this.is_disabled = false;

        this.variants = [
            {label: "Text (defualt)" , value: ''}          ,
            {label: "Outlined"       , value: "outlined"}  ,
            {label: "Contained"      , value: "contained"} ,
        ];
    }
}

module.exports = MDButtonState;
