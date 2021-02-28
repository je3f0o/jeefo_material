/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main_state.js
* Created at  : 2021-01-14
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

const router   = require("@jeefo/state");
const md_media = require("@jeefo/material/services/media");

const style = `
/* sass */
@import '@jeefo/material'

.hide
    display: none !important

.attr-header
    padding: 8px 0 4px 10px

.center
    +size(100%)
    +flex-center
    flex-direction: column

[md-theme="dark"] .md-sidenav-container__backdrop
    opacity: .5

input, select, textarea, a
    //-webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-tap-highlight-color: transparent
`;

const template = `
{jt}
mdTypography[
    style   = "height: 100vh; display: block;"
    mdTheme = "{{ theme }}"
] >
    mdSidenavContainer >
        mdSidenav[
            isOpen  = "is_open"
            variant = "{{ $md_theme.is('gt-xs') ? 'side' : 'over' }}"
        ] >
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
            ^   ^   ^
        .main >
            mdAppBar[color="{{ app_bar_color }}"] >
                mdToolbar >
                    mdButton[
                        style   = "margin-left: -8px;"
                        variant = "icon"
                        (click) = "is_open = !is_open"
                        jfClass = "{ hide: $md_theme.is('gt-xs') }"
                    ] >
                        mdIcon[name="menu"] ^
                    [style="flex: 1 1 0;"](Material design) +
                    mdButton[
                        style   = "flex: 0 0 auto"
                        variant = "icon"
                        (click) = "toggle_theme()"
                    ] >
                        mdIcon[
                            name    = "brightness_4"
                            jfClass = "{ hide : theme === 'dark' }"
                        ] +
                        mdIcon[
                            name    = "brightness_5"
                            jfClass = "{ hide : theme === 'light' }"
                        ]
                ^   ^   ^
            [style="padding: 16px;"] >
                uiView ^
            .footer[style="padding: 0 16px;"](Version: {{version}})
`;

class MainState {
    static get url      () { return '/';      }
    static get style    () { return style;    }
    static get template () { return template; }

    async on_init ($element) {
        //$element.add_class("main");
        this.version = "#pkg.version";

        this._is_open = false;
        this.theme = localStorage.getItem("theme") || "light";
        this.set_app_color = () => {
            this.app_bar_color = this.theme === "dark" ? '' : "primary";
        };
        this.set_app_color();

        this.toggle_theme = () => {
            this.theme = this.theme === "light" ? "dark" : "light";
            this.set_app_color();
            localStorage.setItem("theme", this.theme);
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
            {label: "Surface"                          , url: "surface"   } ,
            {label: "Sidenav"                          , url: "sidenav"   } ,
            {label: "Selection"                        , url: "selection" } ,
        ].sort((a, b) => a.label.localeCompare(b.label));

        router.on("change_state", () => {
            if (md_media.is("xs")) this._is_open = false;
        });
    }

    get is_open () {
        return md_media.is("gt-sm") ? true : this._is_open;
    }

    set is_open (value) {
        if (! md_media.is("gt-sm")) this._is_open = value;
    }

    is_selected (path) {
        const regex = new RegExp(`/${path}(?:\?.*)?`);
        return regex.test(path);
    }

    on_destroy () {
    }
}

module.exports = MainState;