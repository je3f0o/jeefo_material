 jeefo.register("./main.js", async (exports, module) => { const __dirname = ".", __filename = "./main.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.js
* Created at  : 2020-12-28
* Updated at  : 2021-02-19
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

/*
jeefo.load_script("/js/test.js");
jeefo.promise_all([/* imaginary promises /]);
*/

const bootstrap = (await require("./bootstrap"));

window.addEventListener("load", async function main () {
    try {
        await bootstrap();
    } catch (e) {
        const pre = document.createElement("pre");
        pre.appendChild(new Text(`${e}\n${decodeURIComponent(e.stack)}`));
        document.body.appendChild(pre);
    }
});
 }); 
//# sourceURL=./main.js 