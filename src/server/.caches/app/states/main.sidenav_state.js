 jeefo.register("./states/main.sidenav_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.sidenav_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const template = (`<demo-box class="vert"><md-tabs><md-tab md-emphasis="high">Sidenav</md-tab></md-tabs><attributes><md-selection><md-checkbox value="is_open"></md-checkbox><label>is-open</label></md-selection><div md-emphasis="medium" class="attr-header">Variant</div><md-selection align="middle"><md-radio name="variant" value="side" on--change="variant = $element.DOM_element.value" is-selected="variant === 'side'"></md-radio><label>side</label></md-selection><md-selection align="middle"><md-radio name="variant" value="over" on--change="variant = $element.DOM_element.value" is-selected="variant === 'over'"></md-radio><label>over</label></md-selection><div md-emphasis="medium" class="attr-header">Position</div><md-selection align="middle"><md-radio name="position" value="left" on--change="position = $element.DOM_element.value" is-selected="position === 'left'"></md-radio><label>left</label></md-selection><md-selection align="middle"><md-radio name="position" value="right" on--change="position = $element.DOM_element.value" is-selected="position === 'right'"></md-radio><label>right</label></md-selection></attributes><md-sidenav-container style="height: 352px;"><md-sidenav style="width: 200px;" is-open="is_open" variant="{{ variant }}" position="{{ position }}"><md-typography variant="h4" style="text-align: center; padding: 16px;">Sidenav content</md-typography></md-sidenav><div class="center"><md-typography variant="h5">Main content</md-typography><md-typography variant="subtitle-2"><div>is_open: {{ is_open }}</div><div>variant: {{ variant }}</div><div>position: {{ position }}</div></md-typography></div></md-sidenav-container></demo-box>`
/* space filler



























































*/);

var MDSidenavState = (function () { function MDSidenavState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSidenavState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "sidenav"; }; Object.defineProperty(MDSidenavState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDSidenavState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDSidenavState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDSidenavState.prototype.on_init = function () {
        this.is_open  = false;
        this.variant  = "side";
        this.position = "left";
    };

    MDSidenavState.prototype.change_variant = function (element) {
        if (element.checked) this.variant = element.value;
    };

    MDSidenavState.prototype.change_position = function (element) {
        if (element.checked) this.position = element.value;
    };
MDSidenavState.__jeefo_class__ = true; return MDSidenavState;}());

module.exports = MDSidenavState;
 }); 
//# sourceURL=./states/main.sidenav_state.js 