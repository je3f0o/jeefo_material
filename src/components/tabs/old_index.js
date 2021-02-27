/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-07-04
* Updated at  : 2020-06-26
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// jshint curly: false

// ignore:end
const EventEmitter = require("@jeefo/utils/event_emitter");

const array_remove = require("@jeefo/utils/array/remove");

class MDTabsController extends EventEmitter {
    on_init ($element) {
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
            if (! this.active_tab && this.tabs.length) {
                this.tabs[0].activate(false);
            }
            $element.add_class("md-tabs--no-transition");
            $element.rect();
            $element.remove_class("md-tabs--no-transition");
            this.is_rendered = true;
        });
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
}

module.exports = {
    selector : "md-tabs",
    style : "#include style.sass",
    template : `{ jt }
        .md-tabs__wrapper >
            jfContent[select="md-tab"] ^
        .md-tabs__header >
            .nav-buttons >
                jfContent[select="md-tabs-prev-button"] +
                jfContent[select="md-tabs-next-button"] ^
            .md-tabs__header__scroll-wrapper >
                .md-tabs__header__scroller
            ^   ^
        .md-tabs__body
    `,
    bindings : {
        instance: '='
    },
    controller      : MDTabsController,
    controller_name : "$md_tabs",
};
