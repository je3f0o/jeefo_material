/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-07-18
* Updated at  : 2020-10-23
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
const JeefoDOMParser       = require("@jeefo/jqlite/dom_parser");
const Observer             = require("@jeefo/observer");
const TranscludeController = require("@jeefo/component/transclude_controller");
const vendor               = require("../../services/vendor"); // jshint ignore:line
//const menu_service         = require("../../services/menu");
//const MDRipple             = require("../../utils/ripple");

const modifier_class = {
    opened    : "md-input--opened",
    focused   : "md-input--focused",
    disabled  : "md-input--activated",
    activated : "md-input--activated",
};

//const prop_observer = Symbol("observer");
const prop_disabled = Symbol("is-disabled");

const KEY_ENTER      = 13;
const KEY_SPACE      = 32;
const KEY_ESCAPE     = 27;
const KEY_ARROW_UP   = 38;
const KEY_ARROW_DOWN = 40;

// Hard coded dynamic values for select bottom line height
const box_shadow = `
    0 5px 5px -3px rgba(0,0,0,.2),
    0 8px 10px 1px rgba(0,0,0,.14),
    0 3px 14px 2px rgba(0,0,0,.12)
`;
const FILLER_STYLE_BORDER_BOTTOM_WIDTH = 2;

const calculate_list_style = ({
    $list, $select, $container, $root = jqlite(document.body)
}) => {
    const list_rect = $list.rect();
    const root_rect = $root.rect();

    const $item = $list.first(".md-list__item");
    const item_height = $item.height;

    if (list_rect.top + list_rect.height + item_height <= root_rect.height) {
        return {
            borderRadius    : "0 0 4px 4px",
            transformOrigin : "top center",
        };
    }
    const parent_rect = $list.parent().rect();
    const delta_y     = list_rect.top - parent_rect.top;
    let border_width = 0;
    if ($container.has_class("md-input--filled")) {
        border_width = FILLER_STYLE_BORDER_BOTTOM_WIDTH;
    }

    if (list_rect.top - list_rect.height + border_width >= item_height) {
        // go upside
        const top = -list_rect.height + $select.height - border_width;
        return {
            top             : `${top}px`,
            boxShadow       : box_shadow,
            borderRadius    : "4px 4px 0 0",
            transformOrigin : "bottom center",
        };
    }

    // way too long items
    let top = item_height - list_rect.top + delta_y;
    const result = {
        top          : `${top}px`,
        boxShadow    : box_shadow,
        borderRadius : "4px",
    };

    if (root_rect.height - item_height * 2 <= list_rect.height) {
        result.height = `${Math.max(root_rect.height - item_height * 2, 0)}px`;
    }

    return result;
};

const set_input_event_handlers = ($container, $input) => {
    $input.on("change", () => {
        const method = $input.value ? "add_class" : "remove_class";
        $container[method](modifier_class.activated);
    });
};

const set_select_event_handlers = ($container, $select, ctrl) => {
    let is_opened           = false;
    const $overlay          = $container.first(".md-input__overlay__value");
    const $list             = $container.first(".md-input__list-wrapper");
    const select            = $select.DOM_element;
    const container         = $container.DOM_element;
    const dom_options       = $select.DOM_element.options;
    const {firstChild:list} = $list.DOM_element;

    function open_menu () {
        const $selected_option = $list.first(".md-list__item--selected");

        $container.add_class(modifier_class.opened);
        $list.remove_attr("style");
        $list.style("transition", "none");
        const css = calculate_list_style({
            $list, $select, $container
        });

        $list.css({
            opacity   : 0,
            transform : "scale(0.8)",
        });
        $list.trigger_reflow();

        css.opacity    = null;
        css.transform  = null;
        css.transition = null;
        $list.css(css);

        if ($selected_option) {
            $selected_option.DOM_element.focus();
        }
        $container.add_class(modifier_class.focused);

        is_opened = true;
    }

    function close_menu () {
        $container.remove_class(modifier_class.opened);
        is_opened = false;
    }

    const toggle_menu = () => is_opened ? close_menu() : open_menu();

    const on_change = () => {
        if ($select.value) {
            $overlay.text = dom_options[$select.DOM_element.selectedIndex].text;
            $container.add_class(modifier_class.activated);
        } else {
            $overlay.text = '';
            $container.remove_class(modifier_class.activated);
        }
        close_menu();
    };
    $select.on("change"     , on_change);
    $select.on("initialized", on_change);

    $select.on("mousedown", event => {
        if (event.button === 0) {
            event.preventDefault();
            $select.DOM_element.focus();

            toggle_menu();
        }
    });

    $select.on("keydown", event => {
        switch (event.keyCode) {
            case KEY_ARROW_UP   :
            case KEY_ARROW_DOWN :
                if (! is_opened) {
                    event.preventDefault();
                    open_menu();
                }
                break;
            case KEY_SPACE:
            case KEY_ENTER:
                event.preventDefault();
                toggle_menu();
                break;
        }
    });

    ctrl.on_keyup = event => {
        if (event.keyCode === KEY_ESCAPE && is_opened) {
            event.preventDefault();
            close_menu();
            select.focus();
        }
    };

    ctrl.on_select = option => {
        if (option.index !== select.selectedIndex) {
            option.selected = true;
            $select.trigger("change");
        } else {
            close_menu();
        }
        select.focus();
    };

    let timeout_id;
    ctrl.on_focusout = () => {
        clearTimeout(timeout_id);
        timeout_id = setTimeout(() => {
            if (! list.contains(document.activeElement)) {
                const items = list.querySelectorAll(":scope > md-list-item");
                for (const [index, item] of items.entries()) {
                    if (index === select.selectedIndex) {
                        item.setAttribute("tabindex", 0);
                    } else if (item.getAttribute("tabindex") === '0') {
                        item.setAttribute("tabindex", -1);
                    }
                }

                if (! container.contains(document.activeElement)) {
                    $container.remove_class(modifier_class.focused);
                }

                close_menu();
            }
        });
    };
};

const set_textarea_event_handlers = ($element, $textarea) => {
    $textarea.on("paste", event => {
        event.preventDefault();

        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
    });
    $textarea.on("input", () => {
        const method = $textarea.text ? "add_class" : "remove_class";
        $element[method](modifier_class.activated);
    });
};

const transluder = new TranscludeController(`
{ jt }
.md-input__notch-wrapper >
    .md-input__notch >
        .md-input__notch__head +
        .md-input__notch__body >
            .md-input__notch__body__content +
            .md-input__notch__body__space-filler +
            jfContent[select="label"] ^
        .md-input__notch__tail ^
    .md-input__wrapper >
        jfContent[select="input"] +
        jfContent[select="select"] +
        jfContent[select="textarea"]
    ^   ^
jfContent[select="md-icon"] +
jfContent[select="md-button"]
`);

const select_nodes = JeefoDOMParser.parse(`
{ jt }
div +
[contenteditable] +
.md-input__overlay >
    .md-input__overlay__value +
    mdIcon.md-input__overlay__caret[name="arrow_drop_down"] ^
.md-input__list-wrapper[
    (keyup)     = "$input.on_keyup($event)"
    (focusout)  = "$input.on_focusout()"
    (mousedown) = "$event.preventDefault()"
] >
    mdList >
        mdListItem[
            forEach        = "option in $input.options"
            (select)       = "$input.on_select(option);"
            isSelected     = "option.selected"
            tabindex--init = "{{ option.selected ? 0 : -1 }}"
        ] >
            .md-list__item__text({{ option.text }})
`);
const helper_div   = select_nodes.shift();
const editable_div = select_nodes.shift();

const replace_element = (old_element, new_element) => {
    for (const attr of old_element.attributes) {
        new_element.setAttribute(attr.name, attr.value);
    }
    while (old_element.firstChild) {
        new_element.appendChild(old_element.firstChild);
    }
    return new_element;
};

const leading_or_trailing = (parent_el, child_el, is_input_passed) => {
    const component      = child_el.tagName.toLowerCase().substring(3);
    const leading_class  = `md-input--with-leading-${component}`;
    const trailing_class = `md-input--with-trailing-${component}`;

    if (is_input_passed) {
        if (parent_el.classList.contains(leading_class)) {
            throw new Error(`Multiple leading ${component} detected.`);
        }
        child_el.classList.add(`md-input__leading-${component}`);
        parent_el.classList.add(leading_class);
    } else {
        if (parent_el.classList.contains(trailing_class)) {
            throw new Error(`Multiple trailing ${component} detected.`);
        }
        child_el.classList.add(`md-input__trailing-${component}`);
        parent_el.classList.add(trailing_class);
    }
};

module.exports = {
    selector : "md-input-container",

    dependencies : {
        form : "?form"
    },

    style : "#include style.sass",

    template : element => {
        const helper_text_elems = [];
        let i = element.children.length;
        let is_input_passed;

        while (i--) {
            const child = element.children[i];
            switch (child.tagName) {
                case "HELPER-TEXT" :
                    const helper = replace_element(child, helper_div.cloneNode());
                    element.removeChild(child);
                    helper.classList.add("md-input__helper-text");
                    helper_text_elems.push(helper);
                    break;
                case "MD-ICON"   :
                case "MD-BUTTON" :
                    leading_or_trailing(element, child, is_input_passed);
                    break;
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                    is_input_passed = true;
                    break;
            }
        }

        transluder.transclude(element);
        element.classList.add("md-input");

        const label = element.querySelector(".md-input__notch__body > label");
        if (label) label.classList.add("md-input__label");

        const input_wrapper = element.children[0].children[1];
        if (input_wrapper.children.length !== 1) {
            throw new Error("MDInput element length is not valid");
        }
        let input = input_wrapper.children[0];
        if (input) {
            switch (input.tagName) {
                case "SELECT" :
                    input_wrapper.appendChild(select_nodes[0].cloneNode(true));
                    element.appendChild(select_nodes[1].cloneNode(true));
                    break;
                case "TEXTAREA" :
                    const editable = editable_div.cloneNode();
                    replace_element(input, editable);
                    input_wrapper.replaceChild(editable, input);
                    input = editable;
                    break;
            }
            input.classList.add("md-input__target");
        }

        helper_text_elems.forEach(el => element.appendChild(el));

        /*
        let has_select = false;
        const helper_nodes = [];

        if (! node.class_list.includes("md-input")) {
            node.class_list.push("md-input");
        }

        let i = node.children.length;
        while (i--) {
            switch (node.children[i].name) {
                case "select" :
                    has_select = true;
                    break;
                case "helper-text" :
                    const helper = remove_element(node.children, i);
                    helper.name = "div";
                    helper.class_list.push("md-input-helper-text");
                    helper_nodes.push(helper);
                    break;
            }
        }

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

        const input_wrapper = node.children.find(child => {
            return child.class_list[0] === "md-input__wrapper";
        });

        if (input_wrapper.children.length !== 1) {
            throw new Error("MDInput element length is not right");
        }
        //const input = input_wrapper.children[0];
        if (input && input.name === "textarea") {
            input.name = "div";
            input.attrs.set("contenteditable", "true");
        }
        if (! input.class_list.includes("md-input__target")) {
            input.class_list.unshift("md-input__target");
        }

        //const appearance        = node.attrs.get("appearance");
        const has_class_outline = node.class_list.includes("md-input_outlined");
        const is_outlined = (
            has_class_outline ||
            (appearance && appearance.trim().toLowerCase() === "outlined")
        );

        if (is_outlined) {
            if (! has_class_outline) {
                node.class_list.push("md-input_outlined");
            }

            const field = field_node.clone(true);
            const index = node.children.findIndex(n => n.name === "label");
            if (index >= 0) {
                const label = remove_element(node.children, index);
                label.class_list.push("md-input__label");
                field.children[0].children[1].children.push(label);
            }
            node.children.unshift(field);
        } else {
            //node.class_list.push("md-input-filled");
            //node.children.push(underline_node);
        }

        if (has_select) {
            //input_overlay.forEach(n => node.children.push(n.clone(true)));
        }

        // final step
        //node.children.push(helper_nodes);
        */
    },

    bindings : {
        [prop_disabled] : "<isDisabled",
        ["on_open"]     : "<onOpen",
    },

    controller_name : "$input",

    controller : class MDInputContainer {
        on_init ($element) {
            const $input = $element.first(".md-input__target");
            const $label = $element.first(".md-input__label");
            const $notch = $element.first(".md-input__notch__body__content");

            $input.on("blur", () => {
                $element.remove_class(modifier_class.focused);
            });

            $input.on("focus", () => {
                if ($element.has_class("md-input--outlined") && $label) {
                    $label.css({
                        fontSize   : "12px",
                        transition : "none"
                    });

                    $notch.width = $label.width + 8;

                    $label.style("fontSize", null);
                    $label.trigger_reflow();
                    $label.remove_attr("style");
                }
                $element.add_class(modifier_class.focused);
            });

            const has_variant_class = (
                $element.has_class("md-input--filled") ||
                $element.has_class("md-input--outlined")
            );
            if (! has_variant_class) {
                const variant = $element.get_attr("variant") || "filled";
                if (variant) {
                    $element.add_class(`md-input--${variant}`);
                }
            }

            switch ($input.name) {
                case "INPUT" :
                    set_input_event_handlers($element, $input);
                    break;
                case "DIV" :
                    set_textarea_event_handlers($element, $input);
                    break;
                case "SELECT" :
                    this.options = $input.DOM_element.options;
                    set_select_event_handlers($element, $input, this);
                    break;
                default:
                    console.warn(
                        `MDInput ${ $input.name } is not implemented yet.`
                    );
            }

            $element.once("render", () => {
                //let $editable;
                const model_name = $input.get_attr("name");
                const model = (
                    model_name && this.form &&
                    this.form.__form_data.models[model_name]
                );
                if (model) {
                    this[model_name] = model;
                    /*
                    if ($editable) {
                        model.connect($editable);
                    }
                    */
                }
            });

            const observer = new Observer(this);
            observer.on(prop_disabled, is_disabled => {
                if (is_disabled) {
                    if ($input.name === "DIV") {
                        $input.remove_attr("contenteditable");
                    } else {
                        $input.set_attr("disabled");
                    }
                    $element.add_class(modifier_class.disabled);
                } else {
                    if ($input.name === "DIV") {
                        $input.set_attr("contenteditable");
                    } else {
                        $input.remove_attr("disabled");
                    }
                    $element.remove_class(modifier_class.disabled);
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
