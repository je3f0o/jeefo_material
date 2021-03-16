 jeefo.register("./states/main.surface_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.surface_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.surface_state.js
* Created at  : 2021-01-19
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

const style = (`.demo-surface{width:128px;height:128px;display:flex;align-items:center;justify-content:center}`
/* space filler





*/);

const template = (`<demo-box><md-tabs><md-tab>Surface</md-tab></md-tabs><attributes><div md-emphasis="high" class="demo-box__attr-title">Color</div><md-selection for-each="c in colors"><md-radio name="color" value="{{ c.value }}" is-selected="color === c.value" on--change="color = $element.value"></md-radio><label>{{ c.label }}</label></md-selection></attributes><md-surface color="{{ color }}" class="demo-surface">Content</md-surface></demo-box>`
/* space filler















*/);

var MDSurfaceState = (function () { function MDSurfaceState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSurfaceState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "surface"; }; Object.defineProperty(MDSurfaceState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "style"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSurfaceState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function    () { return style; }; Object.defineProperty(MDSurfaceState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSurfaceState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDSurfaceState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDSurfaceState.prototype.on_init = function () {
        this.color = '';
    };
MDSurfaceState.__jeefo_class__ = true; return MDSurfaceState;}());

module.exports = MDSurfaceState;
 }); 
//# sourceURL=./states/main.surface_state.js 