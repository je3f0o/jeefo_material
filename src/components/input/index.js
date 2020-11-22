/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-07-18
* Updated at  : 2020-10-31
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
const md_theme             = require("@jeefo/material/services/theme");
const class_modifier       = require("@jeefo/material/utils/class_modifier");
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
        .md-input__foreground >
            jfContent.md-input__target[select="input"] +
            jfContent.md-input__target[select="select"] +
            jfContent.md-input__target[select="textarea"] +
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

const style = `
/* sass */
@import '@jeefo/material'

.md-input
    $root  : &
    $notch : #{$root}__notch

    $label-align : 16px
    $input-margin-from-icon: 12px

    $line-height      : 19px
    $text-caption-size: 12px

    $left-align       : 16px
    $right-align      : 12px
    $label-padding    : 4px
    $border-radius    : 4px
    $helper-baseline  : 16px
    $notch-side-width : 12px

    $icon-width       : 24px
    $icon-box-width   : $icon-width + $label-align + $input-margin-from-icon

    +rel
    width          : 100%
    display        : inline-block
    box-sizing     : border-box
    vertical-align : middle

    .md-icon
        pointer-events: none

    &__label
        +abs($top: 50%, $left: 16px)
        overflow    : hidden
        max-width   : calc(100% - #{$left-align + $right-align + $label-padding})
        font-size   : 16px
        transform   : translateY(-50%)
        transition  : left .25s, top .25s, transform .25s, color .25s, font-size .25s
        white-space : nowrap

        #{$root}--focused &,
        #{$root}--activated &
            top       : 0
            left      : 16px
            font-size : $text-caption-size

    &__helper-text
        display    : block
        padding    : 0 $right-align 0 $left-align
        font-size  : $text-caption-size
        text-align : left
        box-sizing : border-box

        &:before
            height  : $helper-baseline
            content : ''
            display : inline-block

    &__wrapper
        +rel
        +size(100%)
        overflow : hidden

    &__target
        color       : currentColor
        width       : 100%
        border      : none
        display     : block
        min-height  : 56px
        box-sizing  : border-box
        line-height : $line-height

        font:
            size   : 16px
            family : Roboto
        &:focus
            outline: none

    select#{&}__target
        color  : transparent
        cursor : pointer
        /*! vendor.prefix("appearance", "none") */

    &__overlay
        +size(100%)
        +abs($top: 0, $left: 0)
        box-sizing     : border-box
        pointer-events : none
        &__value
            +truncate
        &__caret
            +abs($top: 50%, $right: 10px)
            transform  : translateY(-50%)
            transition : transform .25s
            #{$root}--opened &
                transform: translateY(-50%) rotateZ(180deg)

    &__list-wrapper
        +abs
        width      : 100%
        opacity    : 1
        z-index    : 1
        display    : none
        transform  : scale(1)
        transition : opacity .25s, transform .12s cubic-bezier(0,0,0.2,1)
        overflow-y : auto
        //box-sizing : border-box

        #{$root}--opened &
            display: block

    // Notch
    &__notch-wrapper
        +rel

    &__notch
        +abs
        +size(100%)
        display    : flex
        transition : color .25s
        &__head, &__tail
            width      : $notch-side-width
            box-sizing : border-box
        &__body
            width     : 100%
            display   : flex
            max-width : calc(100% - #{$notch-side-width * 2})

    &--filled
        #{$root}__notch-wrapper, #{$root}__target
            border-radius : 4px 4px 0 0

        #{$root}__target
            padding    : 25px 16px (56px - 25px - $line-height)
            transition : background-color 0.25s

        #{$root}__overlay
            padding : 25px 40px (56px - 25px - $line-height) 16px

        #{$root}__wrapper
            &:before, &:after
                +abs($left: 0, $bottom: 0)
                width   : 100%
                content : ''
                border-bottom : solid currentColor
            &:before
                border-width : 1px
            &:after
                transform    : scaleX(0)
                transition   : transform .25s cubic-bezier(.4, 0, .2, 1)
                border-width : 2px

        #{$root}__label:before
            height     : 0
            content    : ''
            display    : inline-block
            transition : height .25s

        &#{$root}--focused,
        &#{$root}--activated
            #{$root}__label
                transform : none
                &:before
                    height: 20px
            #{$root}__wrapper:after
                transform: scaleX(1)

    &--outlined
        #{$root}__target
            padding          : 19px 16px (56px - 19px - $line-height)
            background-color : transparent
        #{$root}__overlay
            padding : 19px 40px (56px - 19px - $line-height) 16px

        #{$notch}__head
            border        : 1px solid
            border-right  : none
            border-radius : $border-radius 0 0 $border-radius
        #{$notch}__tail
            border        : 1px solid
            border-left   : none
            border-radius : 0 $border-radius $border-radius 0
        #{$notch}__body
            border-bottom : 1px solid

            &__content
                +rel
                box-sizing : border-box

                &:before, &:after
                    +abs
                    width      : 50%
                    content    : ''
                    display    : block
                    border-top : 1px solid
                    transition : width .25s, border-top-color .25s
                &:after
                    right : 0

            &__space-filler
                flex-grow  : 1
                border-top : 1px solid

        &:hover,
        &#{$root}--focused
            #{$notch}__head,
            #{$notch}__tail,
            #{$notch}__body,
            #{$notch}__body__content:before,
            #{$notch}__body__content:after,
            #{$notch}__body__space-filler
                border-width: 2px

        &#{$root}--focused,
        &#{$root}--activated
            #{$root}__label
                left: $left-align
            #{$notch}__body
                &__content
                    &:before, &:after
                        width: 0



    &--with-leading-icon
        #{$root}__leading-icon
            +abs($left: $label-align, $top: 16px)
    &--with-trailing-icon
        #{$root}__trailing-icon
            +abs($right: $label-align, $top: 16px)

    &--with-leading-button
        #{$root}__leading-button
            +abs($left: $label-align, $top: 8px)
    &--with-trailing-button
        #{$root}__trailing-button
            +abs($right: 8px, $top: 8px)


    &--with-leading-icon,
    &--with-leading-button
        &:not(.md-input--focused):not(.md-input--activated)
            &:not(.md-input--with-trailing-icon),
            &:not(.md-input--with-trailing-button)
                #{$root}__label
                    max-width: calc(100% - #{$icon-box-width + $label-align})
            &.md-input--with-trailing-icon,
            &.md-input--with-trailing-button
                #{$root}__label
                    max-width: calc(100% - #{$icon-box-width * 2})

        #{$root}__label
            left: $icon-box-width

        #{$root}__target
            padding-left: $icon-box-width

    &--with-trailing-icon,
    &--with-trailing-button
        #{$root}__target
            padding-right: $icon-box-width

    // ===============================
    // theme
    // ===============================

    // Select
    //&__list-wrapper
        @extend %background
    //md-list
        @extend %background-surface--activated
`;

md_theme.register_template(`
/* sass */
@import '@jeefo/material'

.md-input
    $root: &

    #{$root}__foreground
        +property-template(color)

    +theme-modifiers($root, (primary, secondary))
        &#{$root}--focused
            +property-template(color)

    +theme-modifiers($root, (error))
        +property-template(color)

    &--filled
        & #{$root}__input-wrapper
            +property-template(background-color)

        & #{$root}__target
            +property-template(background-color)
            &:hover
                +property-template(background-color)

        &#{$root}--focused #{$root}__target
            +property-template(background-color)

`);

module.exports = {
    selector : "md-input-container",

    style,

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

        const foreground = element.querySelector(".md-input__foreground");
        const inputs     = foreground.querySelectorAll(".md-input__target");
        if (inputs.length !== 1) {
            throw new Error("MDInput element length is not valid");
        }
        let input = inputs[0];
        if (input) {
            switch (input.tagName) {
                case "SELECT" :
                    foreground.appendChild(select_nodes[0].cloneNode(true));
                    element.appendChild(select_nodes[1].cloneNode(true));
                    break;
                case "TEXTAREA" :
                    const editable = editable_div.cloneNode();
                    replace_element(input, editable);
                    foreground.replaceChild(editable, input);
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
        color           : '@',
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

            if (typeof this.color === "string") {
                const modifiers = ["primary", "secondary", "error"];
                const on_color_change = class_modifier(
                    $element.DOM_element, "md-input", modifiers
                );
                observer.on("color", v => on_color_change(v.toLowerCase()));
                on_color_change(this.color.toLowerCase());
            }

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
