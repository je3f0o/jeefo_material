 jeefo.register("./states/main.settings_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.settings_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.settings_state.js
* Created at  : 2021-03-07
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

const template = (`<md-card variant="outlined"><md-toolbar color="primary">Theme</md-toolbar><div style="padding: 16px;" class="md-background"><md-selection><md-checkbox value="is_auto" on--change="theme = on_auto_changed($element.DOM_element, selected_name)" on--initialized="init($md_theme)"></md-checkbox><label>Auto detect system theme</label></md-selection><md-selection for-each="t in themes"><md-radio name="theme" value="{{ t.value }}" on--change="theme = select(t.value)" is-disabled="theme === 'auto'" is-selected="selected_name === t.value"></md-radio><label>{{ t.label }}</label></md-selection></div></md-card>`
/* space filler



















*/);

module.exports = (function () { function SensorApiState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "settings"; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    SensorApiState.prototype.on_init = function () {
        this.is_auto       = true;
        this.selected_name = null;

        this.themes = [
            {label: "Day"   , value: "light"} ,
            {label: "Night" , value: "dark" } ,
        ];
    };

    SensorApiState.prototype.select = function (name) {
        this.selected_name = name;
        return name;
    };

    SensorApiState.prototype.init = function ($md_theme) {
        this.is_auto       = $md_theme.value === "auto";
        this.selected_name = $md_theme.name;
    };

    SensorApiState.prototype.on_auto_changed = function (element, value) {
        return element.checked ? "auto" : value;
    };
SensorApiState.__jeefo_class__ = true; return SensorApiState;}());
 }); 
//# sourceURL=./states/main.settings_state.js 