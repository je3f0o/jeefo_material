 jeefo.register("./components/demo_box.js", async (exports, module) => { const __dirname = "./components", __filename = "./components/demo_box.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : demo_box.js
* Created at  : 2021-01-24
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

const md_media = (await require("@jeefo/material/services/media"));
const md_theme = (await require("@jeefo/material/services/theme"));

exports.style = (`.demo-box{border:1px solid;display:block;transition:box-shadow 150ms linear}.demo-box.vert .demo-box__body{flex-direction:column}.demo-box.vert .demo-box__body>*{flex-grow:1}.demo-box.no-appbar .demo-box__titlebar{display:none}.demo-box .demo-sidenav{width:200px}.demo-box:hover{box-shadow:0 0 8px 0 rgba(0,0,0,.08),0 0 15px 0 rgba(0,0,0,.02),0 0 20px 4px rgba(0,0,0,.06)}.demo-box__attr-title{padding:12px 0 4px 10px}.demo-box__appbar{height:48px;padding:0 4px 0 16px;display:flex;box-sizing:border-box;align-items:center;border-bottom:1px solid;justify-content:space-between}.demo-box__attributes{padding:6px;display:block}.demo-box__body{display:flex;align-items:center;justify-content:center;width:100%;min-height:352px}.demo-box .md-button{flex-shrink:0}.demo-box.dense .demo-sidenav{width:210px}.demo-box.dense .demo-box__attributes{font-size:14px}.demo-box.dense .demo-box__attr-title{padding:12px 0 5px 10px}.demo-box.dense .md-selection{padding:3px 8px}.demo-box.dense .md-selection label{font-size:14px;margin-left:7px !important}.demo-box.dense .md-checkbox input,.demo-box.dense .md-checkbox__ripple:before,.demo-box.dense .md-checkbox__ripple:after{width:28px;height:28px;top:-3px;left:-3px}.demo-box.dense .md-checkbox svg{width:22px;height:22px}.demo-box.dense .md-checkbox .md-icon:after{width:16px;height:16px;top:3px;left:3px}.demo-box.dense .md-radio input,.demo-box.dense .md-radio__ripple:before,.demo-box.dense .md-radio__ripple:after{width:28px;height:28px;top:-3px;left:-3px}.demo-box.dense .md-radio svg{width:22px;height:22px}.demo-box.dense .md-radio__icon{width:18px;height:18px}.demo-box.dense .md-radio__icon:after{width:100%;height:100%;top:0;left:0}.demo-box.dense .md-radio input:checked~.md-radio__icon:after{transform:scale(0.5)}`
/* space filler

































































































*/);

md_theme.set_default({
    ".demo-box": {
        "border-color": "$divider-color",
    },
    ".demo-box__appbar": {
        "border-color": "$divider-color",
    },
    ".demo-box__body": {
        "background-color": "$background-color",
    },
});

md_theme.register_template((`.demo-box{content:"props:[border-color]"}.demo-box__appbar{content:"props:[border-color]"}.demo-box__body{content:"props:[background-color]"}`
/* space filler









*/));

exports.template = (`<md-sidenav-container md-elevation="1"><md-sidenav is-open="$demo_box.is_open" variant="{{ $demo_box.mode }}" position="right" class="demo-sidenav"><div style="position: relative; z-index: 1;" class="demo-box__appbar"><div>Configuration</div><md-button size="medium" variant="icon" on--mouseup="$md_sidenav.close()" md-emphasis="medium"><md-icon name="close"></md-icon></md-button></div><md-scrollable style="position: absolute; top: 0; padding-top: 48px"><jf-content select="attributes" on--initialized="$demo_box.has_attrs = true;" class="demo-box__attributes"></jf-content></md-scrollable></md-sidenav><md-surface><div class="demo-box__appbar demo-box__titlebar"><jf-content select="md-tabs" index="$demo_box.index"></jf-content><md-button if="$demo_box.has_attrs" size="medium" variant="icon" jf-class="{ hide: $demo_box.is_open && $demo_box.mode === 'side' }" on--mouseup="$demo_box.is_open = true;" md-emphasis="medium"><md-icon name="tune"></md-icon></md-button></div><div class="demo-box__body"><jf-content></jf-content></div></md-surface></md-sidenav-container>`
/* space filler







































*/);

exports.controller = (function () { function DemoBox () {} 
    DemoBox.prototype.on_init = function ($element) {
        this.index     = -1;
        this.has_attrs = $element.first("attributes") !== null;
        $element.add_class("demo-box");

        const on_media_change = () => {
            if (md_media.is("gt-xs") && this.has_attrs) {
                this.mode    = "side";
                this.is_open = true;
            } else {
                this.mode    = "over";
                this.is_open = false;
            }
        };

        on_media_change();
        md_media.on("breakpoint_changed", on_media_change);
    };
DemoBox.__jeefo_class__ = true; return DemoBox;}());

exports.controller_name = "$demo_box";
 }); 
//# sourceURL=./components/demo_box.js 