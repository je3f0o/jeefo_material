/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : bootstrap.js
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

require("./polyfills");

const router               = require("@jeefo/state");
const compile              = require("@jeefo/component/compiler");
const md_theme             = require("@jeefo/material/services/theme");
const EventEmitter         = require("@jeefo/utils/event_emitter");
const JeefoElement         = require("@jeefo/jqlite/jeefo_element");
const extend_member        = require("@jeefo/utils/class/extend_member");
const MonkeyPatcher        = require("@jeefo/monkey_patcher");
const {InvisibleComponent} = require("@jeefo/component");

extend_member(EventEmitter, "trigger", function (event) {
    if (typeof event === "string") {
        event = new Event(event);
    }
    this.emit(event.type, event);
});

const root = new InvisibleComponent("(root)", {});

const event_invoker = function (original_method, context, args) {
    args[1] = this.patch(args[1]);
    return original_method.apply(context, args);
};

const event_patcher = new MonkeyPatcher(
    JeefoElement.prototype, "on", event_invoker
);

let is_pending;
const original_timeout = window.setTimeout;
const digest_handler = () => {
    if (is_pending) return;

    original_timeout(() => {
        is_pending = false;
        root.digest();
    }, 0);

    is_pending = true;
};

event_patcher.on_leave = digest_handler;
event_patcher.on_error = e => {
    console.error("EventPatcher error:", e);
};

require("./directives/register");
require("./components/register");
require("./states/register");

const sheet = {};
const rules = {};

Object.assign(sheet, {
    // MD Emphasis
    ".demo-box__body": {
        "background-color": "rgba(0,0,0,.02)",
    },
});
rules[".md-card > .md-surface > .md-toolbar"] = {
    "color"           : "$on_primary-color",
    "background-color": "$primary-color",
};

const elevation_rule_setter = require("@jeefo/material/attributes/elevation");
require("./md_icons");

md_theme.register_theme({
    name   : "light",
    colors : {
        error         : "#B00020",
        primary       : "#6200ea", // deep_purple-a700
        secondary     : "#03dac6",
        surface       : "#fff",
        background    : "#fff",

        status        : "#311b92", // deep_purple-900
        divider       : "rgba(black, .12)",

        on_error      : "#fff",
        on_primary    : "#fff",
        on_secondary  : "#000",
        on_surface    : "#000",
        on_background : "#000",
    },
    sheet,
    rules,
});

delete rules[".md-card > .md-surface > .md-toolbar"];
elevation_rule_setter(rules, true);
sheet[".md-surface"] = {
    "color"            : "$on_surface-color",
    "background-color" : "blend($surface-color, white, .05)",
};
sheet[".demo-box__body"] = {
    "background-color" : "rgba(0,0,0,.5)",
};
sheet[".md-tabs__button--selected"] = {
    "color": "rgba($on_surface-color, .87)",
};

md_theme.register_theme({
    name   : "dark",
    colors : {
        error             : "#cf6679",
        primary           : "#b39ddb", // deep_purple-200
        secondary         : "#03dac6",
        surface           : "#121212",
        background        : "#121212",

        status            : "#2e2e2e", // blend(bg, .12); evelation 8
        divider           : "rgba(white, .12)",

        on_error          : "#000",
        on_primary        : "#000",
        on_secondary      : "#000",
        on_surface        : "#fff",
        on_background     : "#fff",
    },
    sheet,
    rules,
});

module.exports = async () => {
    await compile.from_elements([document.firstElementChild], root, false);

    router.go(location.href, "pop");

    const elements = await compile(`{jt}uiView[style="overflow-x: hidden;"]`, root);

    await root.initialize();

    for (const element of elements)    document.body.appendChild(element);
    for (const child of root.children) child.trigger_render();

    console.log(root);
};
