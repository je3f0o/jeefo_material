/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-07-18
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

const jqlite               = require("@jeefo/jqlite");
const JeefoDOMParser       = require("@jeefo/jqlite/dom_parser");
const Observer             = require("@jeefo/observer");
const theme_service        = require("@jeefo/material/services/theme");
const vendor               = require("../../services/vendor"); // jshint ignore:line
//const menu_service         = require("../../services/menu");
//const MDRipple             = require("../../utils/ripple");

const {isInteger} = Number;

const modifier_class = {
    opened    : "md-input--opened",
    focused   : "md-input--focused",
    disabled  : "md-input--disabled",
    activated : "md-input--activated",
};

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

exports.style = `
/* sass */
@import '@jeefo/material'

@keyframes shake-filled
    0%
        transform: none
    33%
        transform: translateX(4px)
    66%
        transform: translateX(-4px)
    100%
        transform: none

@keyframes shake-outlined
    0%
        transform: translateY(-50%)
    33%
        transform: translate(4px, -50%)
    66%
        transform: translate(-4px, -50%)
    100%
        transform: translateY(-50%)

.md-input
    $root  : &
    $notch : #{$root}__notch

    $label-align : 16px
    $input-margin-from-icon: 12px

    $line-height      : 19px
    $text-caption-size: 12px

    $left-align       : 16px
    $right-align      : 12px
    $side-padding     : 16px
    $label-padding    : 4px
    $border-radius    : 4px
    $helper-baseline  : 16px
    $notch-side-width : 12px

    $icon-width       : 24px
    $icon-box-width   : $icon-width + $label-align + $input-margin-from-icon

    +rel
    width          : 100%
    display        : block
    box-sizing     : border-box
    vertical-align : middle

    &__label
        +abs($top: 50%, $left: 16px)
        overflow    : hidden
        max-width   : calc(100% - #{$left-align + $right-align + $label-padding})
        font-size   : 16px
        transform   : translateY(-50%)
        transition  : left .25s, top .25s, transform .25s, color .15s, font-size .25s
        white-space : nowrap

        #{$root}--focused &,
        #{$root}--activated &
            top       : 0
            left      : 16px
            font-size : $text-caption-size

        #{$root}--invalid &:after
            content     : '*'
            margin-left : 1px

        &.shake-filled
            animation: shake-filled 250ms
        &.shake-outlined
            animation: shake-outlined 250ms

    &__wrapper
        +rel
        +size(100%)
        overflow : hidden

    &__target
        color       : currentColor
        width       : 100%
        border      : none
        display     : block
        background  : currentColor
        min-height  : 56px
        box-sizing  : border-box
        line-height : $line-height
        transition  : color 150ms

        font:
            size   : 16px
            family : Roboto
        &:focus
            outline: none

    &__captions
        display         : flex
        padding         : 0 $side-padding
        justify-content : space-between

    &--hide
        display: none !important

    &__character-counter
        padding-left: 16px

    &__helper-text
        display: block
        &:before
            height  : $helper-baseline
            content : ''
            display : inline-block

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

        &#{$root}--focused #{$root}__wrapper:after
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
                    transition : width .25s
                &:after
                    right : 0

            &__space-filler
                flex-grow  : 1
                border-top : 1px solid

        &:not(#{$root}--disabled)#{$root}--focused
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
            #{$notch}__body__content
                &:before, &:after
                    width: 0


    .md-icon
        pointer-events: none

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
`;

theme_service.set_default({
    ".md-input": {
        "color": "rgba($on_surface-color, .6)",
    },
    ".md-input--disabled": {
        "color": "rgba($on_surface-color, .38)",
    },
    ".md-input:not(.md-input--disabled).md-input--invalid": {
        "color": "$error-color",
    },
    ".md-input:not(.md-input--disabled) .md-input__target": {
        "color": "rgba($on_surface-color, .87)",
    },
    ".md-input:not(.md-input--disabled):not(.md-input--invalid).md-input--focused .md-input__notch-wrapper": {
        "color": "$primary-color",
    },

    // Filled
    ".md-input--filled .md-input__target": {
        "background-color": "rgba($on_surface-color, .04)",
    },
    ".md-input--filled:not(.md-input--disabled) .md-input__target:hover": {
        "background-color": "rgba($on_surface-color, .08)",
    },
    ".md-input--filled:not(.md-input--disabled).md-input--focused .md-input__target": {
        "background-color": "rgba($on_surface-color, .12)",
    },

    // Outlined
    ".md-input--outlined:not(.md-input--disabled):not(.md-input--invalid) .md-input__notch": {
        "color": "rgba($on_surface-color, .38)",
    },
    ".md-input--outlined:not(.md-input--disabled):not(.md-input--invalid):hover .md-input__notch": {
        "color": "rgba($on_surface-color, .87)",
    },
    ".md-input--outlined:not(.md-input--disabled):not(.md-input--invalid):not(.md-input--focused) .md-input__label": {
        "color": "rgba($on_surface-color, .6)",
    },
    ".md-input--outlined:not(.md-input--disabled):not(.md-input--invalid).md-input--focused .md-input__notch": {
        "color": "$primary-color",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-input
    $root: &

    +property-template(color)

    &--disabled
        +property-template(color)

    &:not(#{$root}--disabled)
        #{$root}__target
            +property-template(color)

        &#{$root}--invalid
            +property-template(color)

        &:not(#{$root}--invalid)#{$root}--focused #{$root}__notch-wrapper
            +property-template(color)

    // Filled
    &--filled
        #{$root}__target
            +property-template(background-color)

        &:not(#{$root}--disabled)
            #{$root}__target:hover
                +property-template(background-color)

            &#{$root}--focused #{$root}__target
                +property-template(background-color)

    // Outlined
    &--outlined:not(#{$root}--disabled):not(#{$root}--invalid)
        #{$root}__notch,
        &:hover #{$root}__notch,
        &#{$root}--focused #{$root}__notch,
        &:not(#{$root}--focused) #{$root}__label
            +property-template(color)
`);

exports.template = `
{jt}
.md-input__notch-wrapper >
    .md-input__notch >
        .md-input__notch__head +
        .md-input__notch__body >
            .md-input__notch__body__content +
            .md-input__notch__body__space-filler +
            jfContent.md-input__label[select="label"] ^
        .md-input__notch__tail ^
    .md-input__wrapper >
        jfContent.md-input__target[select="input"] +
        jfContent.md-input__target[select="select"] +
        jfContent.md-input__target[select="textarea"] +
        jfContent[select="md-icon"] +
        jfContent[select="md-button"]
    ^   ^
mdTypography.md-input__captions[variant="caption"] >
    div >
        .md-input__helper-text[if="$md_input.max_length_passed"](Max length passed) +
        [jfClass="{'md-input--hide': $md_input.max_length_passed}"] >
            jfContent.md-input__helper-text[select="helper-text"]
        ^   ^
    .md-input__helper-text.md-input__character-counter[
        jfClass="{'md-input--hide': ! $md_input.on_input}"
    ]
`;

exports.bindings = {
    variant    : '@',
    maxLength  : '@',
    isInvalid  : '<',
    isDisabled : '<',
};

exports.controller = class MDInputContainer {
    on_init ($element) {
        $element.add_class("md-input");
        const $input        = $element.first(".md-input__target");
        const $label        = $element.first(".md-input__label");
        const $notch        = $element.first(".md-input__notch__body__content");
        const $char_counter = $element.first(".md-input__character-counter");
        const input         = $input ? $input.DOM_element : null;
        const observer      = new Observer(this);

        this.wrapper           = $element.first(".md-input__wrapper").DOM_element;
        this.$element          = $element;
        this.max_length_passed = false;
        this.check_icons();

        $input.on("blur", () => {
            $element.remove_class(modifier_class.focused);
        });

        $input.on("focus", () => {
            if ($element.has_class("md-input--outlined") && $label) {
                this.set_notch_width($notch, $label);
            }
            $element.add_class(modifier_class.focused);
        });

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

        const on_disable_change = is_disabled => {
            let prop = input.tagName === "DIV" ? "contentEditable" : "disabled";
            if (is_disabled) {
                input[prop] = true;
                $element.add_class(modifier_class.disabled);
            } else {
                input[prop] = false;
                $element.remove_class(modifier_class.disabled);
            }
        };

        let old_variant;
        const on_variant_change = value => {
            if (! value) value = "filled";
            if (old_variant) {
                $label.remove_class(`shake-${old_variant}`);
                $element.remove_class(`md-input--${old_variant}`);
            }
            $element.add_class(`md-input--${value}`);

            if (value === "outlined") this.set_notch_width($notch, $label);
            if ($label && $element.has_class("md-input--invalid")) {
                this.shake_label($label);
            }
            old_variant = value;
        };

        let limit;
        const on_invalid_change = value => {
            if (value) {
                $element.add_class("md-input--invalid");
            } else if (! this.max_length_passed) {
                $element.remove_class("md-input--invalid");
            }
            if ($label) {
                if ($element.has_class("md-input--outlined")) {
                    this.set_notch_width($notch, $label);
                }
                if (value) {
                    this.shake_label($label);
                } else {
                    $label.remove_class(this.get_shake_class());
                }
            }
        };

        const on_input = () => {
            const {length} = input.value;
            $char_counter.text = `${length}/${limit}`;
            if (length > limit) {
                this.max_length_passed = true;
                on_invalid_change(true);
            } else if (this.max_length_passed) {
                this.max_length_passed = false;
                on_invalid_change(this.isInvalid);
            }
        };

        const on_max_length_change = value => {
            if (!input) return;
            value = +value;

            if (isInteger(value) && value > 0) {
                limit = value;
                if (! this.on_input) {
                    this.on_input = $input.on("input", on_input);
                }
                on_input();
            } else if (this.on_input) {
                $input.off("input", this.on_input);
                this.on_input          = null;
                this.max_length_passed = false;
                on_invalid_change(this.isInvalid);
            }
        };

        on_variant_change(this.variant);
        on_invalid_change(this.isInvalid);
        on_disable_change(this.isDisabled);
        on_max_length_change(this.maxLength);
        observer.on("variant"    , on_variant_change);
        observer.on("maxLength"  , on_max_length_change);
        observer.on("isInvalid"  , on_invalid_change);
        observer.on("isDisabled" , on_disable_change);
    }

    set_notch_width ($notch, $label) {
        const font_size  = $label.style("fontSize")   || null;
        const transition = $label.style("transition") || null;

        $label.css({
            fontSize   : "12px",
            transition : "none",
        });

        $notch.width = $label.width + 8;

        $label.style("fontSize", font_size);
        $label.trigger_reflow();
        $label.style("transition", transition);
    }

    shake_label ($label) {
        const {$element}   = this;
        const shake_class  = this.get_shake_class();
        const is_shackable = (
            $element.has_class("md-input--focused") ||
            $element.has_class("md-input--activated")
        );

        if (is_shackable) {
            $label.add_class(shake_class);
        } else {
            $label.remove_class(shake_class);
        }
    }

    is_shackable ($input) {
        return $input && (
            $input.focused || $input.has_class("md-input--activated")
        );
    }

    get_shake_class () {
        let variant = "filled";
        if (this.$element.has_class("md-input--outlined")) {
            variant = "outlined";
        }
        return `shake-${variant}`;
    }

    check_icons () {
        const {wrapper, $element} = this;
        let input_passed;
        $element.remove_class(
            "md-input--with-leading-icon", "md-input--with-trailing-icon"
        );

        for (let i = 0; i < wrapper.children.length; ++i) {
            const el = wrapper.children[i];
            switch (el.tagName) {
                case "MD-ICON" :
                    const pos = input_passed ? "trailing" : "leading";
                    $element.add_class(`md-input--with-${pos}-icon`);
                    el.classList.add(`md-input__${pos}-icon`);
                    break;
                case "INPUT":
                    input_passed = true;
                    break;
            }
        }
    }
};

exports.controller_name = "$md_input";
