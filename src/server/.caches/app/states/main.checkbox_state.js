 jeefo.register("./states/main.checkbox_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.checkbox_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.checkbox_state.js
* Created at  : 2021-02-04
* Updated at  : 2021-02-23
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

const template = (`<demo-box><md-tabs><md-tab md-emphasis="high">Checkbox</md-tab></md-tabs><attributes><div md-emphasis="high" class="demo-box__attr-title">Color</div><md-selection align="middle" for-each="c in colors" md-emphasis="{{ color === c.value ? 'high' : '' }}"><md-radio name="color" color="primary" value="{{ c.value }}" is-selected="color === c.value" on--change="color = $element.value"></md-radio><label>{{ c.name }}</label></md-selection></attributes><div md-emphasis="{{ is_checked ? 'high' : 'medium' }}"><md-checkbox color="{{ color }}" on--change="is_checked   = $element.DOM_element.checked"></md-checkbox></div></demo-box>`
/* space filler
























*/);

var MDCheckboxState = (function () { function MDCheckboxState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDCheckboxState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "checkbox"; }; Object.defineProperty(MDCheckboxState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDCheckboxState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDCheckboxState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDCheckboxState.prototype.on_init = function () {
        this.color      = '';
        this.is_checked = false;
    };
MDCheckboxState.__jeefo_class__ = true; return MDCheckboxState;}());

module.exports = MDCheckboxState;
 }); 
//# sourceURL=./states/main.checkbox_state.js 