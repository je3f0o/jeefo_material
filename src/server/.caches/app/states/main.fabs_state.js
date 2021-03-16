 jeefo.register("./states/main.fabs_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.fabs_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.fabs_state.js
* Created at  : 2021-02-28
* Updated at  : 2021-03-03
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

const template = (`<demo-box><md-tabs><md-tab>FAB</md-tab><md-tab>Extented</md-tab></md-tabs><div jf-class="{ hide: $demo_box.index !== 0 }"><md-button variant="fab"><md-icon name="stars"></md-icon></md-button></div><div jf-class="{ hide: $demo_box.index !== 1 }"><md-typography variant="subtitle-1">Not completed yet</md-typography></div></demo-box>`
/* space filler










*/);

var MDButtonState = (function () { function MDButtonState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDButtonState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "fabs"; }; Object.defineProperty(MDButtonState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDButtonState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDButtonState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDButtonState.prototype.on_init = function () {
    };
MDButtonState.__jeefo_class__ = true; return MDButtonState;}());

module.exports = MDButtonState;
 }); 
//# sourceURL=./states/main.fabs_state.js 