 jeefo.register("./states/main.list_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.list_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.list_state.js
* Created at  : 2021-01-18
* Updated at  : 2021-03-04
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

const template = (`<demo-box><md-tabs><md-tab md-emphasis="high">List item</md-tab></md-tabs><attributes md-emphasis="medium"><div md-emphasis="high" class="demo-box__attr-title">Not completed yet</div></attributes><div style="padding: 40px; width: 100%;"><md-card shape="square" variant="outlined"><md-list><md-list-item for-each="item in items"><md-icon name="favorite"></md-icon><div>List item</div><md-list-meta md-emphasis="medium">Meta</md-list-meta></md-list-item></md-list></md-card></div></demo-box>`
/* space filler












*/);

var MDListState = (function () { function MDListState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDListState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "list"; }; Object.defineProperty(MDListState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDListState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDListState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDListState.prototype.on_init = function () {
        this.items = Array(3).fill(1);
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
    };

    MDListState.prototype.change_before = function (element) {
        if (element.checked) this.before = element.value;
    };

    MDListState.prototype.change_after = function (element) {
        if (element.checked) this.after = element.value;
    };
MDListState.__jeefo_class__ = true; return MDListState;}());

module.exports = MDListState; }); 
//# sourceURL=./states/main.list_state.js 