/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-07-04
* Updated at  : 2021-03-03
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

const Observer            = require("@jeefo/observer");
const EventEmitter        = require("@jeefo/utils/event_emitter");
const array_remove        = require("@jeefo/utils/array/remove");
const {definitions_table} = require("@jeefo/component");
const theme_service       = require("../../services/theme");
const class_modifier      = require("../../utils/class_modifier");

definitions_table.register_component("md-tab", `${__dirname}/tab`);

exports.selector = "md-tabs";

exports.style = `
/* sass */
@import '@jeefo/material'

.md-tabs
    $root: &

    display  : block
    overflow : hidden

    &__scroll-wrapper
        overflow       : scroll hidden
        margin-bottom  : -20px
        padding-bottom :  20px

    &__content
        display: flex

    &__button
        +rel
        +button
        +flex-center
        flex       : 1 0 auto
        border     : none
        height     : 48px
        padding    : 0 24px
        outline    : none
        background : transparent
        transition : color .25s ease

        .md-icon + *
            margin-left: 8px

        &--selected &__indicator
            +abs($bottom: 0)
            +size(100%, 2px)
            transition    : transform .25s cubic-bezier(.4, 0, .2, 1)
            border-bottom : 2px solid currentColor

        &--stacked
            height: 72px
            .md-typography
                display         : flex
                align-items     : center
                flex-direction  : column
            .md-icon + *
                margin: 6px 0 0

    &--scrollable
        & #{$root}__scroller,
        & #{$root}__content
            float: left
`;

theme_service.set_default({
    ".md-tabs__button": {
        "color": "rgba($on_surface-color, .6)",
    },
    ".md-tabs__button--selected": {
        "color": "$primary-color"
    },
    ".md-tabs--scrollable .md-tabs__scroller": {
        "padding" : "0 40px",
    },
    ".md-tabs--scrollable .md-tabs__content": {
        "background-color" : "rgba($on_surface-color, .04)",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-tabs
    $root: &

    &__button
        +property-template(color)
        &--selected
            +property-template(color)

    &--scrollable
        & #{$root}__scroller
            +property-template(padding)
        & #{$root}__content
            +property-template(background-color)
`);

exports.template = `
{jt}
.md-tabs__scroll-wrapper >
    .md-tabs__scroller >
        .md-tabs__content >
            jfContent[select="md-tab"]
`;

exports.bindings = {
    index   : '=',
    variant : '@',
};

exports.controller = class MDTabs extends EventEmitter {
    on_init ($element) {
        const observer = new Observer(this);

        $element.add_class("md-tabs");
        this.tabs     = [];
        this.selected = null;
        this.$element = $element;

        $element.on("initialized", () => {
            if (! this.selected && this.tabs.length) {
                this.select(this.tabs[0]);
            }
            this.initialized = true;
        });

        const on_variant_change = (new_value, old_value) => {
            $element.remove_class(`md-tabs--${old_value}`);
            if (new_value) $element.add_class(`md-tabs--${new_value}`);
        };
        on_variant_change(this.variant);
        observer.on("variant", on_variant_change);

        return;
        const el             = $element.DOM_element;
        this.tabs            = [];
        this.body            = el.lastChild;
        this.wrapper         = el.firstChild;
        this.$element        = $element;
        this.is_rendered     = false;
        this.$scroll_wrapper = $element.children(1, 1);
        this.scroller        = this.$scroll_wrapper.DOM_element.firstChild;

        $element.add_class("md-tabs");
        $element.once("rendered", () => {
            if (! this.selected && this.tabs.length) {
                this.select(this.tabs[0]);
            }
            $element.add_class("md-tabs--no-transition");
            $element.trigger_reflow();
            $element.remove_class("md-tabs--no-transition");
            this.is_rendered = true;
        });
    }

    select (tab) {
        const selected_class = "md-tabs__button--selected";
        let prev_indicator_rect;
        if (this.selected) {
            prev_indicator_rect = this.selected.$indicator.rect();
            this.selected.$element.set_attr("tabindex", -1);
            this.selected.$element.remove_class(selected_class);
            this.selected.is_selected = false;
        }

        tab.$element.add_class(selected_class);
        if (prev_indicator_rect) {
            const curr_indicator_rect = tab.$indicator.rect();
            const x_pos = prev_indicator_rect.left - curr_indicator_rect.left;
            const ratio = prev_indicator_rect.width / curr_indicator_rect.width;
            tab.$indicator.css({
                transform  : `translateX(${x_pos}px) scaleX(${ratio})`,
                transition : "none",
            });
            tab.$indicator.trigger_reflow();
            tab.$indicator.css({transform: null, transition: null});
        }

        this.index      = this.tabs.indexOf(tab);
        this.selected   = tab;
        tab.$element.set_attr("tabindex", 0);
        tab.is_selected = true;

        if (this.initialized) {
            this.$element.trigger("change", {
                properties: {index: this.index}
            });
        }
    }

    add (tab) {
        let {children: tab_elems} = this.wrapper, i = 0;
        for (; i < tab_elems.length; ++i) if (tab_elems[i] === tab.el) break;
        this.tabs.splice(i, 0, tab);

        if (! this.active_tab && this.is_rendered) {
            tab.activate();
        }
    }

    remove (tab) {
        if (tab.is_activated) {
            const i = this.tabs.indexOf(tab);
            /**/ if (i < 0)                  return;
            else if (i+1 < this.tabs.length) this.tabs[i+1].activate();
            else if (i > 0)                  this.tabs[i-1].activate();
            else if (this.tabs.length > 1)   this.tabs[1].activate();
        }
        array_remove(this.tabs, tab);
    }

    transform (value) {
        this.scroller.style.setProperty("transition", "none");
        this.scroller.style.setProperty("transform", `translateX(${value}px)`);
        this.scroller.getBoundingClientRect();
        this.scroller.style.removeProperty("transition");
        this.scroller.style.removeProperty("transform");
    }

    reposition (tab) {
        array_remove(this.tabs, tab);
        this.add(tab);
    }

    reorder () {
        let direction       = "md-tabs__body__content--left";
        let other_direction = "md-tabs__body__content--right";

        for (const tab of this.tabs) {
            if (tab !== this.active_tab) {
                tab.content.classList.add(direction);
                tab.content.classList.remove(other_direction);
            } else {
                const t         = direction;
                direction       = other_direction;
                other_direction = t;
            }
        }
    }

    prev () {
        const index = this.$tabs.indexOf(this.active_tab);
        if (index > 0) {
            this.$tabs[index - 1].active();
        }
    }

    next () {
        const index = this.$tabs.indexOf(this.active_tab);
        if (index + 1 < this.$tabs.length) {
            this.$tabs[index + 1].active();
        }
    }
};

exports.controller_name = "$md_tabs";
