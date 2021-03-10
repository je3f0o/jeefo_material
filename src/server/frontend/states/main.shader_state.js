/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const Shader = require("../shader");
//const GameEngine = require("./game_engine");

const style = `
/* sass */
@import '@jeefo/material'

.aspect-ratio-16-9
    +rel
    width: 100%
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    padding-top: 56.25%

    & > canvas
        +abs($all: 0)
        +size(100%)
`;

const template = `
{jt}
mdCard.hide[variant="outlined"] >
    mdToolbar[color="primary"](Sensor API Feature detection) +
    .md-background >
        mdList >
            mdListItem[forEach="f in features"] >
                label({{ f.name }}) +
                mdListMeta >
                    mdCheckbox[value="f.is_supported" isDisabled="true"]
    ^   ^   ^   ^   ^
mdCard[variant="outlined" style="user-select: none;"] >
    mdToolbar[color="primary"](GLSL - 3D Camera) +
    .aspect-ratio-16-9 >
        canvas
`;

module.exports = class SensorApiState {
    static get url      () { return "shader"; }
    static get style    () { return style; }
    static get template () { return template; }

    async on_init ($element) {
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
    }

    on_destroy () {
        if (this.shader) this.shader.destroy();
    }
};
