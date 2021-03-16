 jeefo.register("./states/main.card_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.card_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.card_state.js
* Created at  : 2021-01-19
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

const theme_service = (await require("@jeefo/material/services/theme"));

const style = (`.demo-card .header{width:100%;display:flex;padding:16px 8px 16px 16px;box-sizing:border-box;align-items:start}.demo-card .header>.title{flex-grow:1;margin-left:16px}.demo-card .header>.md-button{margin-top:-8px}.demo-card__avatar{width:40px;height:40px;text-align:center;line-height:40px;border-radius:50%}`
/* space filler



















*/);

const set_avatar_color = () => {
    theme_service.set_default({
        ".demo-card__avatar": {
            "color"            : "$on_secondary-color",
            "background-color" : "$secondary-color",
        },
    });

    theme_service.register_template((`.demo-card__avatar{content:"props:[background-color, color]"}`
/* space filler




*/));
};


const template = (`<demo-box style="border:none" class="full no-appbar"><attributes><div md-emphasis="high" class="demo-box__attr-title">Variant</div><md-selection align="middle" for-each="v in variants"><md-radio name="variant" color="primary" value="{{ v.value }}" is-selected="variant === v.value" on--change="variant = $element.value"></md-radio><label>{{ v.name }}</label></md-selection><div md-emphasis="high" class="demo-box__attr-title">Shape</div><md-selection align="middle" for-each="s in shapes"><md-radio name="shape" color="primary" value="{{ s.value }}" is-selected="shape === s.value" on--change="shape = $element.value"></md-radio><label>{{ s.name }}</label></md-selection></attributes><div style="width: 100%; padding: 16px; box-sizing: border-box;" class="lighter-bg"><md-card shape="{{ shape }}" variant="{{ variant }}" class="demo-card"><div md-emphasis="medium"><div class="header"><div class="demo-card__avatar">J</div><div class="title"><md-typography variant="subtitle-1" md-emphasis="high">Shrimp and Chorizo Paella</md-typography><md-typography variant="subtitle-2" style="margin-top: 2px;">September 14, 2016</md-typography></div><md-button size="medium" variant="icon" on--mouseup="$demo_box.is_open = true;"><md-icon name="more_vert"></md-icon></md-button></div><md-image src="https://material-ui.com/static/images/cards/paella.jpg" style="width: 100%;"></md-image><md-typography style="padding: 16px; display: block;" variant="body-2" md-emphasis="medium">This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.</md-typography><md-divider></md-divider><div style="padding: 8px; display: flex;"><md-button variant="icon" size="medium"><md-icon name="favorite"></md-icon></md-button><md-button variant="icon" size="medium"><md-icon name="share"></md-icon></md-button><md-button variant="icon" size="medium" style="margin-left: auto;"><md-icon name="expand_more"></md-icon></md-button></div></div></md-card></div></demo-box>`
/* space filler

























































*/);

var MDCardState = (function () { function MDCardState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDCardState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "card"; }; Object.defineProperty(MDCardState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "style"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDCardState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function    () { return style;  }; Object.defineProperty(MDCardState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDCardState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDCardState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDCardState.prototype.on_init = function ($element) {
        this.shape   = '';
        this.variant = '';

        $element.on("initialized", set_avatar_color);

        this.shapes = [
            {name: "Rounded (default)", value: ''},
            {name: "Square" , value: "square"},
        ];
        this.variants = [
            {name: "Elevated (default)", value: ''},
            {name: "Outlined", value: "outlined"},
        ];
    };
MDCardState.__jeefo_class__ = true; return MDCardState;}());

module.exports = MDCardState;
 }); 
//# sourceURL=./states/main.card_state.js 