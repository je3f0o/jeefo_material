/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.settings_state.js
* Created at  : 2021-03-07
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
mdCard[variant="outlined"] >
    mdToolbar[color="primary"](Theme) +
    .md-background[style="padding: 16px;"] >
        mdSelection >
            mdCheckbox[
                value         = "is_auto"
                (change)      = "theme = on_auto_changed($element.DOM_element, selected_name)"
                (initialized) = "init($md_theme)"
            ] +
            label(Auto detect system theme) ^
        mdSelection[forEach="t in themes"] >
            mdRadio[
                name       = "theme"
                value      = "{{ t.value }}"
                (change)   = "theme = select(t.value)"
                isDisabled = "theme === 'auto'"
                isSelected = "selected_name === t.value"
            ] +
            label({{ t.label }})
`;

module.exports = class SensorApiState {
    static get url      () { return "settings"; }
    static get template () { return template; }

    on_init () {
        this.is_auto       = true;
        this.selected_name = null;

        this.themes = [
            {label: "Day"   , value: "light"} ,
            {label: "Night" , value: "dark" } ,
        ];
    }

    select (name) {
        this.selected_name = name;
        return name;
    }

    init ($md_theme) {
        this.is_auto       = $md_theme.value === "auto";
        this.selected_name = $md_theme.name;
    }

    on_auto_changed (element, value) {
        return element.checked ? "auto" : value;
    }
};
