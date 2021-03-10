/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
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

const router        = require("@jeefo/state");
const md_media      = require("@jeefo/material/services/media");
const theme_service = require("@jeefo/material/services/theme");

const html = document.querySelector("html");
const body = document.querySelector("body");

const ios_status_query = 'meta[name="apple-mobile-web-app-status-bar-style"]';
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


const style = `
/* sass */
@import '@jeefo/material'

.hide
    display: none !important

.center
    +size(100%)
    +flex-center
    flex-direction: column

[md-theme="dark"] .md-sidenav-container__backdrop
    opacity: .5

input, select, textarea, a, label
    //-webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-tap-highlight-color: transparent

.main-scroll-body
    display        : flex
    flex-grow      : 1
    flex-direction : column
    & > ui-view
        flex-grow: 1

.main-scrollable
    $scroll: '.md-scrollable'
    +fix($top: 0)
    padding-top: 56px

    & > #{$scroll}__viewport > #{$scroll}__scroller > #{$scroll}__content
        display        : flex
        min-height     : 100%
        flex-direction : column

.md-card:not(.hide) + .md-card
    margin-top: 16px

.main-content
    height     : unset
    padding    : 16px
    box-sizing : border-box

.md-theme--viewport--xs .demo-box.full
    margin:0 -16px

@media screen and (min-width: 1024px)
    .main-content
        width   : 840px
        padding : 16px 40px
`;

const set_background_class = () => {
    theme_service.set_default({
        ".md-background": {
            "background-color": "$background-color",
        },
        ".lighter-bg": {
            "background-color": "rgba($on_background-color, .03)",
        },
    });

    theme_service.register_template(`
        /* sass */
        @import '@jeefo/material'

        .md-background
            +property-template(background-color)
        .lighter-bg
            +property-template(background-color)
    `);
};

const template = `
{jt}
[
    style         = "width: 100%; height: 100%;"
    mdTheme       = "{{ theme }}"
    (change)      = "on_theme_changed($md_theme);"
    (initialized) = "on_theme_changed($md_theme);"
] >
    mdSidenavContainer.md-typography[
    ] >
        mdSidenav[
            isOpen  = "is_open"
            variant = "{{ $md_theme.is('gt-sm') ? 'side' : 'over' }}"
        ] >
            mdScrollable >
                [
                    mdEmphasis="high"
                    style="
                        padding: 40px 0 12px 24px;
                        font-size: 18px;
                        -webkit-font-smoothing: antialiased;
                    "
                ](Components) +
                mdList[mdEmphasis="medium"] >
                    mdListLink[
                        href       = "/{{c.url}}"
                        style      = "padding-left: 24px;"
                        forEach    = "c in components"
                    ] >
                        span({{c.label}})
            ^   ^   ^   ^
        .main[style="position: relative; height: 100%;"] >
            mdAppBar[
                color = "{{ $md_theme.is_dark ? '' : 'primary' }}"
                style = "position: absolute; top: 0; width: 100%;"
            ] >
                mdToolbar >
                    mdButton[
                        style   = "margin: 0 4px 0 -8px;"
                        variant = "icon"
                        (click) = "is_open = !is_open"
                        jfClass = "{ hide: $md_theme.is('gt-sm') }"
                    ] >
                        mdIcon[name="menu"] ^
                    [style="flex: 1 1 0;"](LBC - Material design) +
                    mdButton.hide[
                        style   = "flex: 0 0 auto"
                        variant = "icon"
                        (click) = "toggle_fullscreen()"
                    ] >
                        mdIcon[
                            name    = "fullscreen"
                            jfClass = "{ hide : is_fullscreen }"
                        ] +
                        mdIcon[
                            name    = "fullscreen_exit"
                            jfClass = "{ hide : ! is_fullscreen }"
                        ] ^
                    mdButton[
                        href    = "/settings"
                        style   = "flex: 0 0 auto; margin-right: -8px;"
                        variant = "icon"
                    ] >
                        mdIcon[name="settings"]
                ^   ^   ^
            mdScrollable.main-scrollable >
                .main-scroll-body >
                    uiView.main-content +
                    .footer[
                        style="padding: 16px;"
                    ](Version: {{version}})
`;

class MainState {
    static get url      () { return '/';      }
    static get style    () { return style;    }
    static get template () { return template; }

    async on_init ($element) {
        //$element.add_class("main");
        this.version       = "#pkg.version";
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
    }

    get is_open () {
        return md_media.is("gt-sm") ? true : this._is_open;
    }

    set is_open (value) {
        if (! md_media.is("gt-sm")) this._is_open = value;
    }

    toggle_fullscreen () {
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
    }

    is_selected (path) {
        const regex = new RegExp(`/${path}(?:\?.*)?`);
        return regex.test(path);
    }

    on_theme_changed ({name, value}) {
        const theme = theme_service.themes.find(t => t.name === name);
        body.style.backgroundColor = theme.vars["$status-color"];
        localStorage.setItem("theme", value);
        if (value === "auto") {

        }
    }

    on_destroy () {
    }
}

module.exports = MainState;