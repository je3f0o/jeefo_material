 jeefo.register("./states/main.inputs_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.inputs_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.inputs_state.js
* Created at  : 2021-02-27
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

const template = (`<demo-box class="dense"><md-tabs><md-tab>inline</md-tab></md-tabs><attributes><div jf-class="{ hide: $demo_box.index !== 0 }"><div md-emphasis="high" class="demo-box__attr-title">Binary attributes</div><md-selection><md-checkbox value="is_disabled"></md-checkbox><label>is-disabled</label></md-selection><md-selection><md-checkbox on--change="limit = $element.DOM_element.checked ? 20 : 0"></md-checkbox><label>has-character-counter</label></md-selection><div md-emphasis="high" class="demo-box__attr-title">Icons</div><md-selection><md-checkbox value="has_leading_icon"></md-checkbox><label>Leading icon</label></md-selection><md-selection><md-checkbox value="has_trailing_icon"></md-checkbox><label>Trailing icon</label></md-selection><div md-emphasis="high" class="demo-box__attr-title">Variant</div><md-selection for-each="v in variants"><md-radio name="variant" value="{{ v.value }}" is-selected="variant === v.value" on--change="variant = $element.value"></md-radio><label>{{ v.label }}</label></md-selection><div md-emphasis="high" class="demo-box__attr-title">Assistive text</div><md-selection for-each="m in messages"><md-radio name="message" value="{{ m.value }}" is-selected="message === m.value" on--change="message = $element.value"></md-radio><label>{{ m.label }}</label></md-selection></div><div jf-class="{ hide: $demo_box.index !== 1 }"><div md-emphasis="high" class="demo-box__attr-title">Binary options</div><md-selection><md-checkbox value="is_disabled"></md-checkbox><label>is-disabled</label></md-selection></div><div jf-class="{ hide: $demo_box.index !== 2 }"><div md-emphasis="high" class="demo-box__attr-title">No options</div></div></attributes><div jf-class="{ hide: $demo_box.index !== 0 }"><md-input-container variant="{{ variant }}" max-length="{{ limit }}" is-invalid="message === 'error'" is-disabled="is_disabled" jf-class="{                'md-input--with-leading-icon'  : has_leading_icon,                'md-input--with-trailing-icon' : has_trailing_icon,            }"><md-icon if="has_leading_icon" name="mail_outline" class="md-input__leading-icon"></md-icon><input></input><md-icon if="has_trailing_icon" name="visibility" class="md-input__trailing-icon"></md-icon><label>Label</label><helper-text jf-class="{hide: message !== 'helper'}">Helper message</helper-text><helper-text jf-class="{hide: message !== 'error'}">Error message</helper-text></md-input-container></div><div jf-class="{ hide: $demo_box.index !== 1 }"><md-button variant="icon" is-disabled="is_disabled"><md-icon name="stars"></md-icon></md-button></div><div jf-class="{ hide: $demo_box.index !== 2 }"><md-button variant="fab"><md-icon name="stars"></md-icon></md-button></div></demo-box>`
/* space filler










































































*/);

var MDInputsState = (function () { function MDInputsState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDInputsState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "inputs"; }; Object.defineProperty(MDInputsState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDInputsState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDInputsState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDInputsState.prototype.on_init = function () {
        this.limit             = 0;
        this.variant           = '';
        this.message           = '';
        this.is_disabled       = false;
        this.has_leading_icon  = false;
        this.has_trailing_icon = false;

        this.css_class = {};
        Object.defineProperty(this.css_class, "md-input--with-leading-icon", {
            get: () => this.has_leading_icon,
        });
        Object.defineProperty(this.css_class, "md-input--with-trailing-icon", {
            get: () => this.has_trailing_icon,
        });

        this.variants = [
            {label: "Filled (defualt)" , value: ''}         ,
            {label: "Outlined"         , value: "outlined"} ,
        ];

        this.messages = [
            {label: "None"        , value: ''       } ,
            {label: "Helper text" , value: "helper" } ,
            {label: "Error text"  , value: "error"  } ,
        ];
    };
MDInputsState.__jeefo_class__ = true; return MDInputsState;}());

module.exports = MDInputsState;
 }); 
//# sourceURL=./states/main.inputs_state.js 