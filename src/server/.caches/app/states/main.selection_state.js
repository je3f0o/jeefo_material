 jeefo.register("./states/main.selection_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.selection_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const template = (`<demo-box><md-tabs><md-tab>Checkbox</md-tab><md-tab>Radio button</md-tab></md-tabs><attributes><div md-emphasis="high" class="demo-box__attr-title">Binary options</div><md-selection><md-checkbox value="is_disabled"></md-checkbox><label>is-disabled</label></md-selection></attributes><div jf-class="{ hide: $demo_box.index !== 0 }"><md-selection><md-checkbox is-disabled="is_disabled"></md-checkbox><label>Label</label></md-selection></div><div jf-class="{ hide: $demo_box.index !== 1 }"><md-selection for-each="r in radio_buttons"><md-radio name="rb" value="{{ r.value }}" is-disabled="is_disabled"></md-radio><label>{{ r.label }}</label></md-selection></div></demo-box>`
/* space filler























*/);

var MDSelectionState = (function () { function MDSelectionState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSelectionState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "selection"; }; Object.defineProperty(MDSelectionState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSelectionState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDSelectionState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDSelectionState.prototype.on_init = function () {
        this.color       = '';
        this.is_disabled = false;

        this.radio_buttons = [
            {label: "Label 1", value: 1},
            {label: "Label 2", value: 2},
        ];
    };
MDSelectionState.__jeefo_class__ = true; return MDSelectionState;}());

module.exports = MDSelectionState;
 }); 
//# sourceURL=./states/main.selection_state.js 