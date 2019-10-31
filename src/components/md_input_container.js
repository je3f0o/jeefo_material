/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_input_container.js
* Created at  : 2019-07-18
* Updated at  : 2019-10-12
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

const jqlite       = require("@jeefo/jqlite");
const vendor       = require("@jeefo/material/services/vendor");
const Observer     = require("@jeefo/observer");
const menu_service = require("@jeefo/material/services/menu");

//const prop_observer = Symbol("observer");
const prop_disabled = Symbol("is-disabled");

const on_change = ($element, $input) => {
    if ($input.value) {
        $element.add_class("activated");
    } else {
        $element.remove_class("activated");
    }
};

const gen_event_handlers = $container => {
    return {
        on_blur  () { $container.remove_class("focused"); },
        on_focus () { $container.add_class("focused");    },
    };
};

const listen_focus_event_handlers = ($element, $input) => {
    const { on_blur, on_focus } = gen_event_handlers($element);
    $input.on("blur" , on_blur);
    $input.on("focus", on_focus);
};

const init_input = ($element, $input) => {
    listen_focus_event_handlers($element, $input);
    $input.on("change" , () => on_change($element, $input));
    on_change($element, $input);
};

const { slice } = Array.prototype;

const init_select = ($element, $select, ctrl) => {
    const dom_options    = $select.DOM_element.options;
    const change_handler = () => {
        if ($select.value) {
            const { text } = dom_options[$select.DOM_element.selectedIndex];
            $element.add_class("activated");
            $element.set_attr("label", text);
        } else {
            $select.remove_class("activated");
        }
    };
    change_handler();

    listen_focus_event_handlers($element, $select);

    $element.add_class("dropdown");

    const show_menu = () => {
        if (menu_service.is_activated) {
            return menu_service.cancel();
        }
        const options = slice.call(dom_options).filter(o => o.value);

        $element.add_class("focused");
        const old_value = $select.value;
        menu_service.show(options, {
            rect : $element.rect(),
        }).then(selected_value => {
            $element.remove_class("focused");
            change_handler();
            if (old_value !== selected_value) {
                $select.trigger("change");
            }
        });
    };

    $select.on("option_added", event => {
        event.preventDefault();
        event.stopPropagation();
        change_handler();
    });

    $select.on("mousedown", event => {
        event.preventDefault();
        if (event.button === 0) {
            event.stopPropagation();
            event.target.blur();

            if (ctrl.on_open) {
                const r = ctrl.on_open();
                if (r instanceof Promise) {
                    r.then(show_menu, err => {
                        console.error(err);
                    });
                }
            } else {
                show_menu();
            }
        }
    });

    $select.on("keyup", event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            event.target.blur();

            if (ctrl.on_open) {
                const r = ctrl.on_open();
                if (r instanceof Promise) {
                    r.then(show_menu);
                }
            } else {
                show_menu();
            }
        }
    });
};

module.exports = {
    selector : "md-input-container",

    style    : `
        md-input-container {
            height         : 56px;
            display        : inline-block;
            position       : relative;
            box-sizing     : border-box;
            vertical-align : middle;
            border-radius  : 4px 4px 0 0;
        }
        md-input-container > label {
            top        : 50%;
            left       : 12px;
            position   : absolute;
            font-size  : 16px;
            transform  : translateY(-50%);
            transition : 250ms;
        }
        md-input-container.focused > label,
        md-input-container.activated > label {
            top       : 0;
            font-size : 12px;
            transform : translateY(9px);
        }
        md-input-container .md-input-wrapper {
            width    : 100%;
            height   : 100%;
            overflow : auto;
            position : relative;
        }
        md-input-container .md-input,
        md-input-container.dropdown:after {
            color            : rgba(255,255,255,0.87);
            width            : 100%;
            height           : 100%;
            border           : none;
            padding          : 20px 12px 5px;
            display          : block;
            box-sizing       : border-box;
            font-size        : 16px;
            line-height      : 20px;
            background-color : transparent;
        }
        md-input-container .md-input {
            border-bottom : 1px solid rgba(255,255,255,0.38);
        }
        md-input-container select.md-input {
            color  : transparent;
            cursor : pointer;
            ${ vendor.prefix("appearance", "none") }
        }
        md-input-container.dropdown.focused {
            background-color: transparent;
        }
        md-input-container.activated.dropdown:after {
            top           : 0;
            z-index       : -1;
            content       : attr(label);
            overflow      : hidden;
            position      : absolute;
            padding-top   : 25px;
            white-space   : nowrap;
            text-overflow : ellipsis;
        }
        md-input-container .md-input:focus {
            outline: none;
        }

        /* icon */
        md-input-container.has-icon > label {
            left: 48px;
        }
        md-input-container.has-icon input {
            padding-left: 48px;
        }
        md-input-container.has-icon md-icon {
            top       : 50%;
            left      : 16px;
            position  : absolute;
            transform : translateY(-50%);
        }
        /*
        md-input-container .md-input {
            color            : rgba(255,255,255,0.87);
            width            : 100%;
            padding          : 0;
            display          : block;
            position         : relative;
            background-color : transparent;
        }
        md-input-container .md-input[contenteditable] {
            word-break: break-word;
        }
        md-input-container .md-input,
        md-input-container .md-placeholder {
            font-size      : 13px;
            box-sizing     : border-box;
            font-weight    : 400;
            font-family    : Roboto;
            line-height    : 20px;
            letter-spacing : 0.6px;
        }
        md-input-container .md-placeholder {
            top      : 0;
            left     : 0;
            color    : rgba(255,255,255,0.6);
            position : absolute;
        }
        */

        .underline {
            width            : 100%;
            height           : 2px;
            bottom           : 0;
            position         : absolute;
            transform        : scale(0);
            background       : rgba(255,255,255,.87);
            transition       : transform 250ms;
            transform-origin : center center;
        }
        md-input-container.focused > .underline {
            transform: scale(1);
        }

        /*
        md-input-container.focused .underline .focused {
            transform: none;
        }
        .underline .focused,
        .underline .unfocused {
            width    : 100%;
            position : absolute;
        }
        .underline .focused {
            top              : 0;
            height           : 100%;
            transform        : scale(0);
            transition       : transform 0.25s;
            transform-origin : center center;
            background-color : rgba(255,255,255,0.87);
        }
        .underline .unfocused {
            bottom           : 0;
            height           : 1px;
            background-color : rgba(255,255,255,0.38);
        }
        */
        .md-block {
            display: block;
        }
    `,

    template : `
        { jt }
        jfContent[select="label"] +
        jfContent[select="md-icon"] +
        .md-input-wrapper >
            jfContent[select="input"] +
            jfContent[select="select"] +
            jfContent[select="textarea"] ^
        .underline
    `,

    bindings : {
        [prop_disabled] : "<isDisabled",
        ["on_open"]     : "<onOpen",
    },

    controller : class MDInputContainer {
        on_init ($element) {
            const $input_wrapper = $element.first(".md-input-wrapper");
            const inputs_length  = $input_wrapper.child_element_length;
            if (inputs_length === 0) {
                return console.warn("MDInputContainer hasn't input element");
            } else if (inputs_length > 1) {
                return console.warn(
                    "MDInputContainer must have exactly one input element"
                );
            }

            if ($element.first("md-icon")) { $element.add_class("has-icon"); }

            const $input = $input_wrapper.children(0);
            $input.add_class("md-input");

            $element.once("renderable", () => {
                switch ($input.name) {
                    case "INPUT" :
                        init_input($element, $input);
                        break;
                    case "SELECT" :
                        init_select($element, $input, this);
                        break;
                    default:
                        console.warn(
                            `MDInput ${ $input.name } is not implemented yet.`
                        );
                }
            });

            /*
            let $placeholder, $replacement;
            if (! $input) {
                $input = $element.first("textarea");
                if ($input) {
                    const $filler = jqlite('<div layout-space-filler></div>');
                    $element.attrs({
                        layout      : "column",
                        layoutAlign : "none end"
                    });
                    $element.children(0).before($filler);

                    $replacement   = jqlite("<div contenteditable></div>");
                    if ($input.has_attr("minRow")) {
                        const row        = $input.get_attr("minRow");
                        const min_height = parseInt(row) * 20;
                        $element.style("minHeight", `${min_height}px`);
                    }
                    if ($input.has_attr("maxRow")) {
                        const row        = $input.get_attr("maxRow");
                        const max_height = parseInt(row) * 20;
                        $element.style("maxHeight", `${max_height}px`);
                    }
                }
            }

            if (! $input) { return; }

            if ($input.has_attr("placeholder")) {
                const text     = $input.get_attr("placeholder");
                const template = `<div class="md-placeholder">${ text }</div>`;
                $placeholder = jqlite(template);
                $input.before($placeholder);
                $input.remove_attr("placeholder");
            }
            if ($replacement) {
                $input.replace($replacement);
                $input = $replacement;
            }

            $input.on("focus", () => {
                $element.add_class("focused");
            });
            $input.on("blur", () => {
                $element.remove_class("focused");
            });
            $input.on("input", () => {
                if ($placeholder) {
                    if ($input.value) {
                        $placeholder.add_class("hide");
                    } else {
                        $placeholder.remove_class("hide");
                    }
                }
                if ($input.value) {
                    $element.add_class("activated");
                } else {
                    $element.remove_class("activated");
                }
            });

            const observer = new Observer(this);
            observer.on(prop_disabled, is_disabled => {
                if (is_disabled) {
                    $input.set_attr("disabled");
                    $element.add_class("disabled");
                } else {
                    $input.remove_attr("disabled");
                    $element.remove_class("disabled");
                }
            });
            */

            /* // Disable event handler using MutationObserver
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    console.log(mutation);
                    if (mutation.attributeName === "disabled") {
                        $element.add_class("disabled");
                    }
                });
            });

            const config = { attributes : true };
            observer.observe($input.DOM_element, config);

            this[prop_observer] = observer;
            */
        }

        //on_destroy () { this[prop_observer].disconnect(); }
    }
};
