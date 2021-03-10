/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const template = `
{jt}
demoBox >
    mdTabs >
        mdTab(Fixed) +
        mdTab(Scrollable) ^
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](Options) +
        mdSelection >
            mdCheckbox[value="has_label"] +
            label(Text label) ^
        .demo-box__attr-title[mdEmphasis="high"](Icons) +
        mdSelection[forEach="i in icons"] >
            mdRadio[
                name       = "icon"
                value      = "{{ i.value }}"
                (change)   = "change_icon($element.DOM_element.value)"
                isDisabled = "! has_label"
                isSelected = "icon === i.value"
            ] +
            label({{ i.label }})
        ^   ^
    [
        style   = "width: 100%; padding: 0 16px; box-sizing: border-box;"
        jfClass = "{ hide: $demo_box.index !== 0 }"
    ] >
        mdTabs >
            mdTab[forEach="t in tabs" variant="{{ has_label ? variant : '' }}"]>
                mdIcon[name="{{ t.icon }}" if="has_icon || !has_label"] +
                label[if="has_label"]({{ t.label }})
        ^   ^   ^
    [
        style   = "width: 100%;"
        jfClass = "{ hide: $demo_box.index !== 1 }"
    ] >
        mdTabs[variant="scrollable"] >
            mdTab[
                forEach = "t in scrollable_tabs"
                variant = "{{ has_label ? variant : '' }}"
            ]>
                mdIcon[name="{{ t.icon }}" if="has_icon || !has_label"] +
                label[if="has_label"]({{ t.label }})
`;

class MDTabsState {
    static get url      () { return "tabs"; }
    static get template () { return template;  }

    on_init () {
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
    }

    get_variant () {
        return this.has_label ? this.variant : '';
    }

    change_icon (value) {
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
    }
}

module.exports = MDTabsState;
