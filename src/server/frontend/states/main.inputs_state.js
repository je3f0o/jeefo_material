/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.inputs_state.js
* Created at  : 2021-02-27
* Updated at  : 2021-02-27
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
        mdTab(Normal input) ^
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
                label({{ v.label }}) ^
            .demo-box__attr-title[mdEmphasis="high"](Assistive text) +
            mdSelection[forEach="m in messages"] >
                mdRadio[
                    name       = "message"
                    value      = "{{ m.value }}"
                    isSelected = "message === m.value"
                    (change)   = "message = $element.value"
                ] +
                label({{ m.label }})
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
        mdInputContainer[
            variant    = "{{ variant }}"
            isInvalid  = "message === 'error'"
            isDisabled = "is_disabled"
        ] >
            input +
            label(Label) +
            helperText[jfClass="{hide: message !== 'helper'}"](Helper message) +
            helperText[jfClass="{hide: message !== 'error'}"](Error message)
        ^   ^
    [jfClass="{ hide: $demo_box.index !== 1 }"] >
        mdButton[variant="icon" isDisabled="is_disabled"] >
            mdIcon[name="stars"]
        ^   ^
    [jfClass="{ hide: $demo_box.index !== 2 }"] >
        mdButton[variant="fab"] >
            mdIcon[name="stars"]
`;

class MDInputsState {
    static get url      () { return "inputs"; }
    static get template () { return template;  }

    on_init () {
        this.variant     = '';
        this.message     = '';
        this.is_disabled = false;

        this.variants = [
            {label: "Filled (defualt)" , value: ''}         ,
            {label: "Outlined"         , value: "outlined"} ,
        ];

        this.messages = [
            {label: "None"        , value: ''       } ,
            {label: "Helper text" , value: "helper" } ,
            {label: "Error text"  , value: "error"  } ,
        ];
    }
}

module.exports = MDInputsState;
