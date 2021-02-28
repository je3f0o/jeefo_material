/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.list_state.js
* Created at  : 2021-01-18
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

/*
        .demo-box__attr-title[mdEmphasis="high"](Before list text) +
        mdSelection[
            align      = "middle"
            forEach    = "l in before_list"
            mdEmphasis = "{{ before === l.value ? 'high' : '' }}"
        ] >
            mdRadio[
                name       = "before"
                color      = "primary"
                value      = "{{ l.value }}"
                isSelected = "before === l.value"
                (change)   = "before = $element.value"
            ] +
            label({{ l.name }}) ^
        .demo-box__attr-title[mdEmphasis="high"](After list text) +
        mdSelection[align="middle"] >
            mdRadio[
                name       = "after"
                value      = "none"
                color      = "primary"
                (change)   = "change_before($element.DOM_element)"
                isSelected = "after === 'none'"
            ] +
            label(None) ^
        mdSelection[align="middle"] >
            mdRadio[
                name       = "after"
                value      = "icon"
                color      = "primary"
                (change)   = "change_before($element.DOM_element)"
                isSelected = "after === 'icon'"
            ] +
            label(Icon) ^
        mdSelection[align="middle"] >
            mdRadio[
                name       = "after"
                value      = "text"
                color      = "primary"
                (change)   = "change_before($element.DOM_element)"
                isSelected = "before === 'text'"
            ] +
            label(Text)
        ^   ^
*/

const template = `
{jt}
demoBox >
    mdTabs >
        mdTab[mdEmphasis="high"](List item) ^
    attributes[mdEmphasis="medium"] >
        .demo-box__attr-title[mdEmphasis="high"](Not completed yet) ^
    [style="padding: 40px; width: 100%;"] >
        mdCard[shape="square" variant="outlined"] >
            mdList >
                mdListItem[forEach="item in items"]({{ item }})
`;

class MDListState {
    static get url      () { return "list"; }
    static get template () { return template;  }

    on_init () {
        this.items = [
            "List item one",
            "List item two",
            "List item three",
            "List item four",
            "List item five",
        ];
        this.before = "none";
        this.after  = "none";

        this.before_list = [
            {
                name  : "None",
                value : "none",
            },
            {
                name  : "Icon",
                value : "icon",
            },
            {
                name  : "Avatar",
                value : "avatar",
            },
        ];
    }

    change_before (element) {
        if (element.checked) this.before = element.value;
    }

    change_after (element) {
        if (element.checked) this.after = element.value;
    }
}

module.exports = MDListState;