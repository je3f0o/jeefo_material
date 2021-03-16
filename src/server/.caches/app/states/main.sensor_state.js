 jeefo.register("./states/main.sensor_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.sensor_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.sensor_state.js
* Created at  : 2021-03-05
* Updated at  : 2021-03-05
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

const template = (`<md-card><md-toolbar>Sensor API Feature detection</md-toolbar><div style="padding: 16px;"><md-list><md-list-item for-each="f in fuatures"><label>{{ f.name }}</label><md-list-meta><md-checkbox value="f.is_supported"></md-checkbox></md-list-meta></md-list-item></md-list></div></md-card>`
/* space filler








*/);

exports.controller = (function () { function SensorApiState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "sensors"; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    SensorApiState.prototype.on_init = function ($element) {
        this.features = [
            {
                name         : "Gyroscope sensor",
                is_supported : typeof Gyroscope === "function",
            },
            {
                name         : "Proximity sensor",
                is_supported : "ProximitySensor" in window,
            },
            {
                name         : "Ambient light sensor",
                is_supported : !! window.AmbientLightSensor,
            },
        ];
    };
SensorApiState.__jeefo_class__ = true; return SensorApiState;}());
 }); 
//# sourceURL=./states/main.sensor_state.js 