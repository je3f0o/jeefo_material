 jeefo.register("./states/main.tabs_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main.tabs_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.tabs_state.js
* Created at  : 2021-02-05
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

const template = (`<demo-box><md-tabs><md-tab>Fixed</md-tab><md-tab>Scrollable</md-tab></md-tabs><attributes><div md-emphasis="high" class="demo-box__attr-title">Options</div><md-selection><md-checkbox value="has_label"></md-checkbox><label>Text label</label></md-selection><div md-emphasis="high" class="demo-box__attr-title">Icons</div><md-selection for-each="i in icons"><md-radio name="icon" value="{{ i.value }}" on--change="change_icon($element.DOM_element.value)" is-disabled="! has_label" is-selected="icon === i.value"></md-radio><label>{{ i.label }}</label></md-selection></attributes><div style="width: 100%; padding: 0 16px; box-sizing: border-box;" jf-class="{ hide: $demo_box.index !== 0 }"><md-tabs><md-tab for-each="t in tabs" variant="{{ has_label ? variant : '' }}"><md-icon name="{{ t.icon }}" if="has_icon || !has_label"></md-icon><label if="has_label">{{ t.label }}</label></md-tab></md-tabs></div><div style="width: 100%;" jf-class="{ hide: $demo_box.index !== 1 }"><md-tabs variant="scrollable"><md-tab for-each="t in scrollable_tabs" variant="{{ has_label ? variant : '' }}"><md-icon name="{{ t.icon }}" if="has_icon || !has_label"></md-icon><label if="has_label">{{ t.label }}</label></md-tab></md-tabs></div></demo-box>`
/* space filler








































*/);

var MDTabsState = (function () { function MDTabsState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDTabsState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return "tabs"; }; Object.defineProperty(MDTabsState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MDTabsState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template;  }; Object.defineProperty(MDTabsState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MDTabsState.prototype.on_init = function () {
        this.icon      = "none";
        this.variant   = '';
        this.has_icon  = false;
        this.has_label = true;

        this.tabs = [
            {label: "tab one"   , icon: "storage"         } ,
            {label: "tab two"   , icon: "chat"            } ,
        ];

        this.scrollable_tabs = [
            {label: "tab one"   , icon: "storage"                } ,
            {label: "tab two"   , icon: "chat"                   } ,
            {label: "tab three" , icon: "vpn_key_outline"        } ,
            {label: "tab four"  , icon: "send"                   } ,
            {label: "tab five"  , icon: "insert_emoticon"        } ,
            {label: "tab six"   , icon: "thumb_up"               } ,
            {label: "tab seven" , icon: "volume_up"              } ,
            {label: "tab eight" , icon: "watch_later"            } ,
            {label: "tab nine"  , icon: "chat_bubble"            } ,
            {label: "tab ten"   , icon: "account_circle_outline" } ,
        ];

        this.icons = [
            {label: "None"         , value: "none"    } ,
            {label: "Leading icon" , value: "leading" } ,
            {label: "Top icon"     , value: "top"     } ,
        ];
    };

    MDTabsState.prototype.get_variant = function () {
        return this.has_label ? this.variant : '';
    };

    MDTabsState.prototype.change_icon = function (value) {
        this.icon = value;
        switch (value) {
            case "none" :
                this.variant   = "";
                this.has_icon  = false;
                this.has_label = true;
                break;
            case "leading" :
                this.variant  = "";
                this.has_icon = true;
                break;
            case "top" :
                this.variant  = "stacked";
                this.has_icon = true;
                break;
        }
    };
MDTabsState.__jeefo_class__ = true; return MDTabsState;}());

module.exports = MDTabsState;
 }); 
//# sourceURL=./states/main.tabs_state.js 