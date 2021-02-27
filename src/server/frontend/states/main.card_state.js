/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.card_state.js
* Created at  : 2021-01-19
* Updated at  : 2021-02-25
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
        mdTab(Card) ^
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](Variant) +
        mdSelection[align="middle" forEach="v in variants"] >
            mdRadio[
                name       = "variant"
                color      = "primary"
                value      = "{{ v.value }}"
                isSelected = "variant === v.value"
                (change)   = "variant = $element.value"
            ] +
            label({{ v.name }}) ^
        .demo-box__attr-title[mdEmphasis="high"](Shape) +
        mdSelection[align="middle" forEach="s in shapes"] >
            mdRadio[
                name       = "shape"
                color      = "primary"
                value      = "{{ s.value }}"
                isSelected = "shape === s.value"
                (change)   = "shape = $element.value"
            ] +
            label({{ s.name }})
        ^   ^
    [style="width: 340px"] >
        mdCard[
            shape   = "{{ shape }}"
            variant = "{{ variant }}"
        ] >
            [style="padding: 16px;"] >
                mdTypography[variant="h6" style="line-height: 2rem"](MD Card) +
                mdTypography[variant="subtitle-1"](Variant: {{ variant || 'default' }}) +
                mdTypography[
                    style   = "margin-top: 4px"
                    variant = "subtitle-1"
                ](Shape: {{ shape || 'default' }})
`;

class MDCardState {
    static get url      () { return "card"; }
    static get template () { return template;  }

    on_init () {
        this.shape   = '';
        this.variant = '';

        this.shapes = [
            {name: "Rounded (default)", value: ''},
            {name: "Square" , value: "square"},
        ];
        this.variants = [
            {name: "Elevated (default)", value: ''},
            {name: "Outlined", value: "outlined"},
        ];
    }
}

module.exports = MDCardState;
