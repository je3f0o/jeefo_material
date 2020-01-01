/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_input_container.js
* Created at  : 2019-07-18
* Updated at  : 2019-12-15
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

const jqlite               = require("@jeefo/jqlite");
//const Observer             = require("@jeefo/observer");
const jeefo_template       = require("@jeefo/template");
const TranscludeController = require("@jeefo/component/transclude_controller");
const vendor               = require("../services/vendor");
const menu_service         = require("../services/menu");

//const prop_observer = Symbol("observer");
const prop_disabled = Symbol("is-disabled");
const { slice } = Array.prototype;
const inputs    = ["input", "select", "textarea"];

const on_change = ($element, $input) => {
    let value = $input.has_attr("contenteditable") ? $input.text : $input.value;
    console.log(value);

    if (value) {
        $element.add_class("activated");
    } else {
        $element.remove_class("activated");
    }
};

const gen_event_handlers = $container => {
    const $label = $container.first("label");
    const $notch = $container.first(".md-input-notch");
    return {
        on_blur  () {
            if ($notch && ! $container.has_class("activated")) {
                $label.remove_attr("style");
            }
            $container.remove_class("focused");
        },
        on_focus () {
            if ($notch) {
                $label.style("transition", "none");
                $label.style("fontSize", "12px");
                $label.style("maxWidth", "calc(100% - 8px)");
                $notch.width = $label.width + 8;
                //const x = $label.DOM_element.offsetLeft - 16;

                $label.remove_attr("style");
                //$label.style("transition", null);
                //$label.style("fontSize", null);
                //$label.style("maxWidth", null);
                //$label.style("top", 0);
                //$label.style("transform", `translate(-${x}px, -50%)`);
            }

            $container.add_class("focused");
        },
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

const replace_textarea = ($element, $textarea) => {
    const $input = jqlite('<div class="md-input" contenteditable></div>');
    $textarea.replace($input);

    listen_focus_event_handlers($element, $input);
    $input.on("input", () => on_change($element, $input));
    on_change($element, $input);
};

const style = `
/* css */
md-input-container {
    display        : inline-block;
    position       : relative;
    box-sizing     : border-box;
    vertical-align : middle;
}
md-input-container label {
    top         : 50%;
    overflow    : hidden;
    position    : absolute;
    max-width   : calc(100% - 8px);
    font-size   : 16px;
    transform   : translateY(-50%);
    transition  : .25s;
    white-space : nowrap;
}
md-input-container.focused   label,
md-input-container.activated label {
    top       : 0;
    font-size : 12px;
}
md-input-container .md-input-wrapper {
    width    : 100%;
    height   : 100%;
    overflow : auto;
    position : relative;
}
md-input-container .md-input {
    color            : currentColor;
    width            : 100%;
    border           : none;
    display          : block;
    font-size        : 16px;
    min-width        : 214px;
    box-sizing       : border-box;
    font-family      : Roboto;
    line-height      : 20px;
    background-color : transparent;
}
md-input-container .md-input:focus {
    outline: none;
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

/* icon */
md-input-container > md-icon {
    top       : 50%;
    position  : absolute;
    transform : translateY(-50%);
}
md-input-container > md-icon.md-input-leading-icon {
    left : 16px;
}
md-input-container > md-icon.md-input-trailing-icon {
    right : 16px;
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

/* filled */
md-input-container.md-input-filled label {
    left : 16px;
}
md-input-container.md-input-filled.focused   label,
md-input-container.md-input-filled.activated label {
    transform : translateY(9px);
}
md-input-container.md-input-filled .md-input {
    padding          : 25px 16px 10px;
    border-radius    : 4px 4px 0 0;
    border-bottom    : 1px solid rgba(255,255,255,0.38);
}
md-input-container.md-input-filled > .underline {
    width            : 100%;
    height           : 2px;
    bottom           : 0;
    position         : absolute;
    transform        : scale(0);
    transition       : transform 250ms;
    transform-origin : center center;
}
md-input-container.md-input-filled.focused > .underline {
    transform: scale(1);
}

/* Outlined */
md-input-container.md-input-outlined {
    border-radius: 4px;
}
md-input-container.md-input-outlined .md-input {
    padding: 17px 16px 19px;
}
md-input-container.md-input-outlined.md-input-with-leading-icon label {
    left      : 36px;
    max-width : calc(100% - 44px);
}
md-input-container.md-input-outlined.md-input-with-leading-icon .md-input {
    padding-left: 48px;
}
md-input-container.md-input-outlined.md-input-with-trailing-icon .md-input {
    padding-right: 48px;
}
md-input-container.md-input-outlined .md-input-notch-container {
    width      : 100%;
    height     : 100%;
    display    : flex;
    position   : absolute;
    transition : color .25s;
}
md-input-container.md-input-outlined .md-input-notch-head,
md-input-container.md-input-outlined .md-input-notch-tail {
    width      : 12px;
    box-sizing : border-box;
}
md-input-container.md-input-outlined .md-input-notch-head {
    border        : 1px solid;
    border-right  : none;
    border-radius : 4px 0 0 4px;
}
md-input-container.md-input-outlined .md-input-notch-tail {
    border        : 1px solid;
    border-left   : none;
    border-radius : 0 4px 4px 0;
}
md-input-container.md-input-outlined .md-input-notch-body {
    width         : 100%;
    display       : flex;
    position      : relative;
    max-width     : calc(100% - 12px * 2);
    border-bottom : 1px solid;
}
md-input-container.md-input-outlined .md-input-notch {
    position   : relative;
    box-sizing : border-box;
}

md-input-container.md-input-outlined .md-input-notch-line-left,
md-input-container.md-input-outlined .md-input-notch-line-right {
    width      : 50%;
    position   : absolute;
    border-top : 1px solid;
    transition : width .25s, border .25s;
}
md-input-container.md-input-outlined .md-input-notch-line-right {
    right : 0;
}
md-input-container.md-input-outlined .md-input-notch-body-top-line {
    flex-grow  : 1;
    border-top : 1px solid;
}

md-input-container.md-input-outlined.focused   label,
md-input-container.md-input-outlined.activated label {
    top       : 0;
    left      : 4px;
    max-width : calc(100% - 8px);
}
md-input-container.md-input-outlined .md-input-notch-head,
md-input-container.md-input-outlined .md-input-notch-body,
md-input-container.md-input-outlined .md-input-notch-tail,
md-input-container.md-input-outlined .md-input-notch-body-top-line {
    transition : border .25s;
}
md-input-container.md-input-outlined.focused .md-input-notch-head,
md-input-container.md-input-outlined.focused .md-input-notch-body,
md-input-container.md-input-outlined.focused .md-input-notch-tail,
md-input-container.md-input-outlined.focused .md-input-notch-line-left,
md-input-container.md-input-outlined.focused .md-input-notch-line-right,
md-input-container.md-input-outlined.focused .md-input-notch-body-top-line {
    border-width: 2px;
}
md-input-container.md-input-outlined.focused   .md-input-notch-line-left,
md-input-container.md-input-outlined.focused   .md-input-notch-line-right,
md-input-container.md-input-outlined.activated .md-input-notch-line-left,
md-input-container.md-input-outlined.activated .md-input-notch-line-right {
    width: 0;
}

md-input-container.md-block {
    display: block;
}
`;

const template_nodes = jeefo_template.parse(`
{ jt }
jfContent[select="label"] +
jfContent[select="md-icon"] +
.md-input-wrapper >
    jfContent[select="input"] +
    jfContent[select="select"] +
    jfContent[select="textarea"] ^
`);
const transluder = new TranscludeController(template_nodes);

const notch_node = jeefo_template.parse(`
{ jt }
.md-input-notch-container >
    .md-input-notch-head +
    .md-input-notch-body >
        .md-input-notch >
            .md-input-notch-line-left +
            .md-input-notch-line-right ^
        .md-input-notch-body-top-line ^
    .md-input-notch-tail
`)[0];
const underline_node = jeefo_template.parse(".underline")[0];

module.exports = {
    selector : "md-input-container",

    style,

    template : node => {
        const icon_index = node.children.findIndex(n => n.name === "md-icon");
        if (icon_index >= 0) {
            const input_index = node.children.findIndex(n => {
                return inputs.includes(n.name);
            });

            if (icon_index < input_index) {
                node.class_list.push("md-input-with-leading-icon");
                node.children[icon_index].class_list.push(
                    "md-input-leading-icon"
                );

                for (let i = input_index + 1; i < node.children.length; ++i) {
                    if (node.children[i].name === "md-icon") {
                        node.children[i].class_list.push(
                            "md-input-trailing-icon"
                        );
                        node.class_list.push("md-input-with-trailing-icon");
                        break;
                    }
                }
            } else if (input_index >= 0) {
                node.children[icon_index].class_list.push(
                    "md-input-trailing-icon"
                );
                node.class_list.push("md-input-with-trailing-icon");
            }
        }

        node.children = transluder.transclude(node.children);
        const appearance        = node.attrs.get("appearance");
        const has_class_outline = node.class_list.includes("md-input-outlined");
        const is_outlined = (
            node.class_list.includes("md-input-outlined") ||
            (appearance && appearance.trim().toLowerCase() === "outlined")
        );

        if (is_outlined) {
            if (! has_class_outline) {
                node.class_list.push("md-input-outlined");
            }

            const notch = notch_node.clone(true);
            const index = node.children.findIndex(n => n.name === "label");
            if (index >= 0) {
                const label = node.children.splice(index, 1)[0];
                notch.children[1].children.push(label);
            }
            node.children.unshift(notch);
        } else {
            node.class_list.push("md-input-filled");
            node.children.push(underline_node);
        }
    },

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

            const $input = $input_wrapper.children(0);
            $input.add_class("md-input");

            $element.once("renderable", () => {
                switch ($input.name) {
                    case "INPUT" :
                        init_input($element, $input);
                        break;
                    case "TEXTAREA" :
                        replace_textarea($element, $input);
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
