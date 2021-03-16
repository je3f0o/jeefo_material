 jeefo.register("./states/main.button_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.button_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const template = (`<demo-box><md-tabs><md-tab>Normal button</md-tab><md-tab>Icon</md-tab></md-tabs><attributes><div jf-class="{ hide: $demo_box.index !== 0 }"><div md-emphasis="high" class="demo-box__attr-title">Binary options</div><md-selection><md-checkbox value="is_disabled"></md-checkbox><label>is-disabled</label></md-selection><div md-emphasis="high" class="demo-box__attr-title">Variant</div><md-selection for-each="v in variants"><md-radio name="variant" value="{{ v.value }}" is-selected="variant === v.value" on--change="variant = $element.value"></md-radio><label>{{ v.label }}</label></md-selection></div><div jf-class="{ hide: $demo_box.index !== 1 }"><div md-emphasis="high" class="demo-box__attr-title">Binary options</div><md-selection><md-checkbox value="is_disabled"></md-checkbox><label>is-disabled</label></md-selection></div><div jf-class="{ hide: $demo_box.index !== 2 }"><div md-emphasis="high" class="demo-box__attr-title">No options</div></div></attributes><div jf-class="{ hide: $demo_box.index !== 0 }"><md-button variant="{{ variant }}" is-disabled="is_disabled">Button</md-button></div><div jf-class="{ hide: $demo_box.index !== 1 }"><md-button variant="icon" is-disabled="is_disabled"><md-icon name="stars"></md-icon></md-button></div></demo-box>`
/* space filler


































*/);

var MDButtonState = (function () { function MDButtonState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDButtonState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "buttons"; }; Object.defineProperty(MDButtonState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDButtonState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDButtonState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDButtonState.prototype.on_init = function () {
        this.variant     = '';
        this.is_disabled = false;

        this.variants = [
            {label: "Text (defualt)" , value: ''}          ,
            {label: "Outlined"       , value: "outlined"}  ,
            {label: "Contained"      , value: "contained"} ,
        ];
    };
MDButtonState.__jeefo_class__ = true; return MDButtonState;}());

module.exports = MDButtonState;
 }); 
//# sourceURL=./states/main.button_state.js 