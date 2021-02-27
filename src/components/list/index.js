/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-10-07
* Updated at  : 2021-02-26
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

const md_theme     = require("../../services/theme");
const array_remove = require("@jeefo/utils/array/remove");

const focused_class  = "md-list__item--focused";
const selected_class = "md-list__item--selected";

exports.selector = "md-list";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-list
    $root: #{&}

    display: block
    padding: 8px 0
    outline: none

    &__item
        +rel
        height      : 48px
        cursor      : pointer
        padding     : 0 16px
        overflow    : hidden
        display     : flex
        align-items : center

        &:focus
            outline: none

        &--selected > .md-ripple:before
            opacity : 0.12

    &__link
        color           : currentColor
        text-decoration : none

    &--has-leading-icon
        padding-left: 24px

        & #{$root}__item
            padding-left: 68px
`;

/*
md_theme.register_template(`
/* sass /
@import '@jeefo/material'

.md-list__item
    $root: #{&}

    +theme-modifiers($root, (primary, secondary))
        +property-template(color)
`);
*/

exports.template = `
    { jt }
    jfContent[select="md-list-item"] +
    jfContent[select="md-list-link"] +
    jfContent[select="md-list-divider"]
`;

exports.controller = class MDList {
    on_init ($element) {
        $element.add_class("md-list");
        this.items = [];

        $element.on("initialized", () => {
            if (this.items.length) {
                const found = this.items.find(item => item.is_selected);
                if (found) {
                    this.select(found);
                } else {
                    this.focusable(this.items[0]);
                }
            }
        });
    }

    add (item) {
        this.items.push(item);
    }

    remove (item) {
        array_remove(this.items, item);
    }

    focusable (item) {
        item.is_focusable = true;
        item.$element.set_attr("tabindex", 0);
    }

    focus (item) {
        this.focusable(item);
        item.$element.add_class(focused_class);
        item.$element.DOM_element.focus();
        for (const _item of this.items) {
            if (_item.is_focusable && _item !== item) {
                _item.is_focusable = false;
                _item.$element.set_attr("tabindex", -1);
            }
        }
    }

    select (item) {
        this.focus(item);
        item.$element.add_class(selected_class);
        item.is_selected = true;
        for (const _item of this.items) {
            if (_item.is_selected && _item !== item) {
                _item.is_selected = false;
                _item.$element.remove_class(selected_class);
            }
        }
    }
};

exports.controller_name = "$md_list";
