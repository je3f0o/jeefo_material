/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.sidenav_state.js
* Created at  : 2021-01-18
* Updated at  : 2021-03-11
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
demoBox.vert >
    mdTabs >
        mdTab[mdEmphasis="high"](Sidenav) ^
    attributes >
        mdSelection >
            mdCheckbox[value="is_open"] +
            label(is-open) ^
        .attr-header[mdEmphasis="medium"](Variant) +
        mdSelection[align="middle"] >
            mdRadio[
                name       = "variant"
                value      = "side"
                (change)   = "variant = $element.DOM_element.value"
                isSelected = "variant === 'side'"
            ] +
            label(side) ^
        mdSelection[align="middle"] >
            mdRadio[
                name       = "variant"
                value      = "over"
                (change)   = "variant = $element.DOM_element.value"
                isSelected = "variant === 'over'"
            ] +
            label(over) ^
        .attr-header[mdEmphasis="medium"](Position) +
        mdSelection[align="middle"] >
            mdRadio[
                name       = "position"
                value      = "left"
                (change)   = "position = $element.DOM_element.value"
                isSelected = "position === 'left'"
            ] +
            label(left) ^
        mdSelection[align="middle"] >
            mdRadio[
                name       = "position"
                value      = "right"
                (change)   = "position = $element.DOM_element.value"
                isSelected = "position === 'right'"
            ] +
            label(right)
        ^   ^
    mdSidenavContainer[style="height: 352px;"] >
        mdSidenav[
            style    = "width: 200px;"
            isOpen   = "is_open"
            variant  = "{{ variant }}"
            position = "{{ position }}"
        ] >
            mdTypography[
                variant="h4"
                style="text-align: center; padding: 16px;"
            ](Sidenav content) ^
        .center >
            mdTypography[variant="h5"](Main content) +
            mdTypography[variant="subtitle-2"] >
                div(is_open: {{ is_open }}) +
                div(variant: {{ variant }}) +
                div(position: {{ position }})
`;

class MDSidenavState {
    static get url      () { return "sidenav"; }
    static get template () { return template;  }

    on_init () {
        this.is_open  = false;
        this.variant  = "side";
        this.position = "left";
    }

    change_variant (element) {
        if (element.checked) this.variant = element.value;
    }

    change_position (element) {
        if (element.checked) this.position = element.value;
    }
}

module.exports = MDSidenavState;
