 jeefo.register("./states/main.shader_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.shader_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.shader_state.js
* Created at  : 2021-03-05
* Updated at  : 2021-03-08
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

const Shader = (await require("../shader"));
//const GameEngine = require("./game_engine");

const style = (`.aspect-ratio-16-9{position:relative;width:100%;padding-top:56.25%}.aspect-ratio-16-9>canvas{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%}`
/* space filler











*/);

const template = (`<md-card variant="outlined" class="hide"><md-toolbar color="primary">Sensor API Feature detection</md-toolbar><div class="md-background"><md-list><md-list-item for-each="f in features"><label>{{ f.name }}</label><md-list-meta><md-checkbox value="f.is_supported" is-disabled="true"></md-checkbox></md-list-meta></md-list-item></md-list></div></md-card><md-card variant="outlined" style="user-select: none;"><md-toolbar color="primary">GLSL - 3D Camera</md-toolbar><div class="aspect-ratio-16-9"><canvas></canvas></div></md-card>`
/* space filler













*/);

module.exports = (function () { function SensorApiState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "shader"; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "style"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function    () { return style; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(SensorApiState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template; }; Object.defineProperty(SensorApiState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    SensorApiState.prototype.on_init = async function ($element) {
        this.alpha = 0;
        this.beta  = 0;
        this.gamma = 0;

        const canvas = $element.first("canvas").DOM_element;

        let source;
        const res = await fetch("/3d_camera.fs");
        if (res.status === 200) {
            source = await res.text();
        }

        $element.on("render", () => {
            this.shader = new Shader(canvas, {source});
            this.shader.play();
        });

        //const a_degree_in_radian = Math.PI / 180;
        //const degree_to_radion   = value => value * a_degree_in_radian;

        /*
        const on_mousedown = e => {
            e.preventDefault();
            const x = Math.round(e.offsetX);
            const y = Math.round(e.offsetY);
            shader.inputs[1].value = [x, y];
        };

        const on_mousemove = e => {
            e.preventDefault();
            const x = Math.round(e.offsetX);
            const y = Math.round(e.offsetY);
            shader.inputs[1].value = [x, y];
        };
        */

        //canvas.addEventListener("touchstar", on_mousedown);
        //canvas.addEventListener("mousedown", on_mousedown);

        //canvas.addEventListener("touchmove", on_mousemove);
        //canvas.addEventListener("mousemove", on_mousemove);

        canvas.onclick = async e => {
            e.preventDefault();
            // feature detect
            const {DeviceOrientationEvent} = window;
            if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
                DeviceOrientationEvent.requestPermission();
            }
            canvas.onclick = null;
        };

        /*
        window.addEventListener("deviceorientation", e => {
            const x = degree_to_radion(e.beta);
            const y = degree_to_radion(e.gamma);
            const z = degree_to_radion(e.alpha);
            shader.inputs[3].value = [x, y, z];
            this.alpha = e.alpha;
            this.beta  = e.beta;
            this.gamma = e.gamma;
            $element.digest();
        });
        */

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

    SensorApiState.prototype.on_destroy = function () {
        if (this.shader) this.shader.destroy();
    };
SensorApiState.__jeefo_class__ = true; return SensorApiState;}());
 }); 
//# sourceURL=./states/main.shader_state.js 