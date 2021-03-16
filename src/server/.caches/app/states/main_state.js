 jeefo.register("./states/main_state.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/main_state.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main_state.js
* Created at  : 2021-01-14
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

const router        = (await require("@jeefo/state"));
const md_media      = (await require("@jeefo/material/services/media"));
const theme_service = (await require("@jeefo/material/services/theme"));

const html = document.querySelector("html");

//const ios_status_query = 'meta[name="apple-mobile-web-app-status-bar-style"]';
//const ios_status_meta  = html.querySelector(ios_status_query);
//const manifest_el      = html.querySelector('link[rel="manifest"]');

//const body = html.querySelector("body");

//html.addEventListener("touchmove", e => e.stopPropa(), {passive: false});
/*
html.addEventListener("touchmove", e => {
    let is_found = false;
    for (const element of e.path) {
        if (element === html) break;
        if (element.classList.contains("md-scrollable")) {
            is_found = true;
            break;
        }
    }

    if (! is_found) e.preventDefault();
}, {passive: false});
*/

let timeout_id;
window.addEventListener("orientationchange", () => {
    clearTimeout(timeout_id);
    html.style.setProperty("height", "initial");
    timeout_id = setTimeout(() => {
        html.style.setProperty("height", "100vh");
        timeout_id = setTimeout(() => {
            html.style.removeProperty("height");
            html.scrollTo(0, 1);
        }, 500);
    }, 500);
});


const style = (`.hide{display:none !important}.center{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column}[md-theme=dark] .md-sidenav-container__backdrop{opacity:.5}input,select,textarea,a,label{-webkit-tap-highlight-color:transparent}.main-scroll-body{display:flex;flex-grow:1;flex-direction:column}.main-scroll-body>ui-view{flex-grow:1}.main-scrollable{position:fixed;top:0;padding-top:56px}.main-scrollable>.md-scrollable__viewport>.md-scrollable__scroller>.md-scrollable__content{display:flex;min-height:100%;flex-direction:column}.md-card:not(.hide)+.md-card{margin-top:16px}.main-content{height:unset;padding:16px;box-sizing:border-box}.md-theme--viewport--xs .demo-box.full{margin:0 -16px}@media screen and (min-width: 1024px){.main-content{width:840px;padding:16px 40px}}`
/* space filler

















































*/);

const set_background_class = () => {
    theme_service.set_default({
        ".md-background": {
            "background-color": "$background-color",
        },
        ".lighter-bg": {
            "background-color": "rgba($on_background-color, .03)",
        },
    });

    theme_service.register_template((`.md-background{content:"props:[background-color]"}.lighter-bg{content:"props:[background-color]"}`
/* space filler






*/));
};

const template = (`<div style="width: 100%; height: 100%;" md-theme="{{ theme }}" on--change="on_theme_changed($md_theme);" on--initialized="on_theme_changed($md_theme);"><md-sidenav-container class="md-typography"><md-sidenav is-open="is_open" variant="{{ $md_theme.is('gt-sm') ? 'side' : 'over' }}"><md-scrollable><div md-emphasis="high" style="                        padding: 40px 0 12px 24px;                        font-size: 18px;                        -webkit-font-smoothing: antialiased;                    ">Components</div><md-list md-emphasis="medium"><md-list-link href="/{{c.url}}" style="padding-left: 24px;" for-each="c in components"><span>{{c.label}}</span></md-list-link></md-list></md-scrollable></md-sidenav><div style="position: relative; height: 100%;" class="main"><md-app-bar color="{{ $md_theme.is_dark ? '' : 'primary' }}" style="position: absolute; top: 0; width: 100%;"><md-toolbar><md-button style="margin: 0 4px 0 -8px;" variant="icon" on--click="is_open = !is_open" jf-class="{ hide: $md_theme.is('gt-sm') }"><md-icon name="menu"></md-icon></md-button><div style="flex: 1 1 0;">LBC - Material design</div><md-button style="flex: 0 0 auto" variant="icon" on--click="toggle_fullscreen()" class="hide"><md-icon name="fullscreen" jf-class="{ hide : is_fullscreen }"></md-icon><md-icon name="fullscreen_exit" jf-class="{ hide : ! is_fullscreen }"></md-icon></md-button><md-button href="/settings" style="flex: 0 0 auto; margin-right: -8px;" variant="icon"><md-icon name="settings"></md-icon></md-button></md-toolbar></md-app-bar><md-scrollable class="main-scrollable"><div class="main-scroll-body"><ui-view class="main-content"></ui-view><div style="padding: 16px;" class="footer">Version: {{version}}</div></div></md-scrollable></div></md-sidenav-container></div>`
/* space filler





































































*/);

var MainState = (function () { function MainState () {} 
    (function () { var __JEEFO_PROPERTY_НЭР__ = "url"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MainState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function      () { return '/';      }; Object.defineProperty(MainState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "style"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MainState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function    () { return style;    }; Object.defineProperty(MainState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());
    (function () { var __JEEFO_PROPERTY_НЭР__ = "template"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MainState, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () { return template; }; Object.defineProperty(MainState, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MainState.prototype.on_init = async function ($element) {
        //$element.add_class("main");
        this.version       = "0.0.6";
        this.is_fullscreen = false;
        this.$element      = $element;

        this._is_open = false;
        this.theme = localStorage.getItem("theme") || "auto";

        this.toggle_theme = () => {
            this.update_app_color();
        };

        this.colors = [
            {
                label : "Default",
                value : '',
            },
            {
                label : "Primary",
                value : "primary",
            },
            {
                label : "Secondary",
                value : "secondary",
            },
        ];

        this.components = [
            {label: "Tabs"                             , url: "tabs"      } ,
            {label: "Card"                             , url: "card"      } ,
            {label: "List"                             , url: "list"      } ,
            {label: "Inputs"                           , url: "inputs"    } ,
            {label: "Buttons"                          , url: "buttons"   } ,
            {label: "Buttons (floating action button)" , url: "fabs"      } ,
            {label: "GLSL Shader"                      , url: "shader"    } ,
            {label: "Surface"                          , url: "surface"   } ,
            {label: "Sidenav"                          , url: "sidenav"   } ,
            {label: "Selection"                        , url: "selection" } ,
        ].sort((a, b) => a.label.localeCompare(b.label));

        $element.on("initialized", () => {
            set_background_class();
        });

        router.on("change_state", () => {
            if (md_media.is("xs")) this._is_open = false;
            const state_url = location.href.slice(location.origin.length);
            localStorage.setItem("last_state_url", state_url);
        });
    };

    (function () { var __JEEFO_PROPERTY_НЭР__ = "is_open"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MainState.prototype, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.get = function () {
        return md_media.is("gt-sm") ? true : this._is_open;
    }; Object.defineProperty(MainState.prototype, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    (function () { var __JEEFO_PROPERTY_НЭР__ = "is_open"; var __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__ = Object.getOwnPropertyDescriptor(MainState.prototype, __JEEFO_PROPERTY_НЭР__) || { configurable: true, enumerable: false }; __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__.set = function (value) {
        if (! md_media.is("gt-sm")) this._is_open = value;
    }; Object.defineProperty(MainState.prototype, __JEEFO_PROPERTY_НЭР__, __JEEFO_PROPERTY_ТОДОРХОЙЛОГЧ__); }());

    MainState.prototype.toggle_fullscreen = function () {
        alert(navigator.standalone);
        alert(document.documentElement.requestFullscreen);
        alert(document.documentElement.webkitRequestFullscreen);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.is_fullscreen = true;
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            this.is_fullscreen = false;
        }
        this.$element.digest();
    };

    MainState.prototype.is_selected = function (path) {
        const regex = new RegExp(`/${path}(?:\?.*)?`);
        return regex.test(path);
    };

    MainState.prototype.on_theme_changed = function ({name, value}) {
        const theme = theme_service.themes.find(t => t.name === name);
        document.body.style.backgroundColor = theme.vars["$status-color"];
        localStorage.setItem("theme", value);
    };

    MainState.prototype.on_destroy = function () {
    };
MainState.__jeefo_class__ = true; return MainState;}());

module.exports = MainState; }); 
//# sourceURL=./states/main_state.js 