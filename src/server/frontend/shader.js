/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : shader.js
* Created at  : 2021-03-05
* Updated at  : 2021-03-06
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

const vs_src = `#version 100
#ifdef GL_ES
precision mediump float;
#endif

attribute vec2 position;

void main () {
    gl_Position = vec4(position, 0., 1.);
}`;

const fs_template = `#version 100
#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
uniform vec2  iMouse;
uniform vec3  iTarget;
uniform vec2  iResolution;

#MAIN_IMAGE

void main () {
    vec4 color = vec4(0);
    mainImage(color, gl_FragCoord.xy);
    gl_FragColor = color;
}`;

const default_fs_src = `void mainImage (out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy/iResolution.xy;
    // Time varying pixel color
    vec3 color = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    fragColor = vec4(color, 1.);
}`;

const {isArray} = Array;

const load_shader = (gl, source_code, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source_code);
    gl.compileShader(shader);

    if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const msg = `JeefoShader: Shader error: ${gl.getShaderInfoLog(shader)}`;
        gl.deleteShader(shader);
        throw new Error(msg);
    }

    return shader;
};

const get_time = last_time => {
    if (last_time === void 0) return performance.now();
    return (performance.now() - last_time) / 1000;
};

const load_vertex = (gl, program) => {
    const data = new Float32Array([
        -1, +1,
        +1, +1,
        -1, -1,
        +1, -1,
    ]);

    const buffer_id = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const attr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(
        attr,
        2, // vec2 per attribute
        gl.FLOAT, // type of element
        gl.FALSE, // Normalized
        0, // Stride
        0 // Offset
    );
};

class JeefoShader {
    constructor (canvas, {source = default_fs_src} = {}) {
        const rect    = canvas.getBoundingClientRect();
        canvas.width  = Math.floor(rect.width);
        canvas.height = Math.floor(rect.height);
        this.canvas   = canvas;

        const gl = this.gl = canvas.getContext("webgl");

        if (gl === null) {
            throw new Error(
                "Unable to initialize WebGL. " +
                "Your browser or machine may not support it."
            );
        }

        source = this.build(source);

        this.vertex_shader   = load_shader(gl, vs_src, gl.VERTEX_SHADER);
        this.fragment_shader = load_shader(gl, source, gl.FRAGMENT_SHADER);
        const program = this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertex_shader);
        gl.attachShader(this.program, this.fragment_shader);
        this.link();

        const init_variable = name => {
            let value;
            const uniform = {
                id         : gl.getUniformLocation(program, name),
                name       : name,
                is_changed : false,
            };

            Object.defineProperty(uniform, "value", {
                get () {
                    return value;
                },
                set (v) {
                    if (value !== v) {
                        value = v;
                        uniform.is_changed = true;
                    }
                },
            });

            return uniform;
        };

        this.inputs = [
            "iTime",
            "iMouse",
            "iResolution",
            "iTarget",
        ].map(name => init_variable(name));

        this.inputs[1].value = [0, 0];
        this.inputs[2].value = [canvas.width, canvas.height];
        this.inputs[3].value = [0, 0, 0];

        gl.useProgram(program);
        this.buffer_id = load_vertex(gl, program);

        this.update = () => {
            this.inputs[0].value = get_time(this.inputs[0].value);

            for (const uniform of this.inputs) {
                if (uniform.is_changed) {
                    let args     = [uniform.id];
                    let dimension = 1;
                    if (isArray(uniform.value)) {
                        dimension = uniform.value.length;
                        for (const v of uniform.value) {
                            args.push(v);
                        }
                    } else {
                        args.push(uniform.value);
                    }
                    const method = `uniform${dimension}f`;
                    gl[method].apply(gl, args);
                    uniform.is_changed = false;
                }
            }
        };

        this.render = () => {
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        this.main_loop = () => {
            this.update();
            this.render();
            this.raf_id = requestAnimationFrame(this.main_loop);
        };

        this.update();
        this.render();
    }

    build (source) {
        return fs_template.replace("#MAIN_IMAGE", source);
    }

    update (source_code) {
        this.gl.shaderSource(this.fragment_shader, source_code);
        this.gl.compileShader(this.fragment_shader);
        this.link();
    }

    link () {
        const {gl, program} = this;
        gl.linkProgram(program);
        if (! gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(
                `JeefoShader: Program error: ${gl.getShaderInfoLog(program)}`
            );
        }
        gl.validateProgram(program);
        if (! gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            throw new Error(
                `JeefoShader: Program error: ${gl.getShaderInfoLog(program)}`
            );
        }
    }

    play () {
        this.raf_id = requestAnimationFrame(this.main_loop);
    }

    destroy () {
        const {gl, raf_id, buffer_id, program} = this;
        cancelAnimationFrame(raf_id);
        if (gl) {
            gl.useProgram(null);

            gl.detachShader(program, this.vertex_shader);
            gl.detachShader(program, this.fragment_shader);
            gl.deleteShader(this.vertex_shader);
            gl.deleteShader(this.fragment_shader);

            if (buffer_id) gl.deleteBuffer(buffer_id);
            if (program) gl.deleteProgram(program);
        }
    }
}

module.exports = JeefoShader;
