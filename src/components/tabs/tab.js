/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : tab.js
* Created at  : 2019-07-05
* Updated at  : 2020-07-10
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

const modifier_class = {
    focused   : "md-tabs__button--focus",
    activated : "md-tabs__button--activated",
};

const EXTRA_SPACE = 24;

class MDTabController extends EventEmitter {
    on_init ($element) {
        const el = this.el = $element.DOM_element;

        const move_elements = () => {
            const {$button, content} = this;
            const {body, wrapper:{children: tabs}, scroller} = this.tabs;

            let i = 0;
            for (; i < tabs.length; i += 1) if (tabs[i] === el) break;

            if ($button && $button.has_class("md-tabs__button")) {
                const next = scroller.children[i];
                if (next) scroller.insertBefore($button.DOM_element, next);
                else      scroller.appendChild($button.DOM_element);
            } else {
                throw new Error("Missing md-tab-button");
            }

            if (content && content.classList.contains("md-tabs__body__content")) {
                const next = body.children[i];
                if (next) body.insertBefore(content, next);
                else      body.appendChild(content);
            } else {
                throw new Error("Missing md-tab-content");
            }
        };

        $element.on("foreach:move", () => {
            this.tabs.reposition(this);
            move_elements();
        });

        $element.once("render", () => {
            this.$button      = $element.children(0);
            this.content      = this.el.children[1];
            this.$element     = $element;
            this.$indicator   = this.$button.children(1);
            this.$btn_content = this.$button.children(0);

            this.$button.on("click", () => {
                if (! this.is_activated) this.activate();
            });
            this.tabs.add(this);

            move_elements();
            if (this.is_activated) this.activate();
        });
    }

    on_destroy () {
        this.tabs.remove(this);
    }

    activate (user_activated = true) {
        this.$button.add_class(modifier_class.activated);

        const {active_tab} = this.tabs;
        if (active_tab) {
            const prev_indicator_rect = active_tab.$indicator.rect();
            const curr_indicator_rect = this.$indicator.rect();

            const ratio = prev_indicator_rect.width / curr_indicator_rect.width;
            const x_pos = prev_indicator_rect.left - curr_indicator_rect.left;

            this.$indicator.css({
                transform  : `translateX(${x_pos}px) scaleX(${ratio})`,
                transition : "none",
            }, false);
            this.$indicator.trigger_reflow();
            this.$indicator.css({
                transform  : null,
                transition : null,
            }, false);

            if (this.tabs.$element.has_class("md-tabs--scrollable")) {
                this.animate_scroller();
            }

            active_tab.deactivate();
        }

        this.is_activated    = true;
        this.tabs.active_tab = this;

        this.$button.set_attr("tabindex", 0, false);
        this.content.classList.add("md-tabs__body__content--activated");
        this.tabs.reorder();

        if (user_activated) {
            this.$button.DOM_element.focus();
            this.$element.trigger("activated");
            this.tabs.$element.trigger("change", {
                properties: {
                    index: this.tabs.tabs.indexOf(this)
                }
            });
        }
    }

    deactivate () {
        this.$button.remove_class(modifier_class.activated);
        this.$button.set_attr("tabindex", -1, false);
        this.content.classList.remove("md-tabs__body__content--activated");
        this.is_activated = false;
        this.$element.trigger("deactivated");
    }

    animate_scroller () {
        const root          = this.tabs.$scroll_wrapper.DOM_element;
        const root_rect     = root.getBoundingClientRect();
        const prev_index    = this.tabs.tabs.indexOf(this.tabs.active_tab);
        const current_index = this.tabs.tabs.indexOf(this);

        if (current_index < prev_index) {
            let delta_x = 0;
            if (current_index === 0) {
                delta_x = root.scrollLeft;
            } else {
                const prev = this.tabs.tabs[current_index - 1];
                const prev_label_rect = prev.$button.children(0).rect();
                const left_pos = prev_label_rect.right - EXTRA_SPACE;
                if (left_pos < root_rect.left) {
                    delta_x = root_rect.left - left_pos;
                }
            }

            if (delta_x) {
                root.scrollLeft -= delta_x;
                this.tabs.transform(-delta_x);
            }
        } else {
            const next = this.tabs.tabs[current_index + 1];
            let right_pos = 0;
            if (next) {
                const next_label_rect = next.$button.children(0).rect();
                right_pos = next_label_rect.left + EXTRA_SPACE;
            } else {
                right_pos = this.tabs.scroller.getBoundingClientRect().right;
            }

            if (right_pos > root_rect.right) {
                const delta_x = right_pos - root_rect.right;
                root.scrollLeft += delta_x;
                this.tabs.transform(delta_x);
            }
        }
    }
}

module.exports = {
    selector : "md-tab",
    template : `
        { jt }
        jfContent[select="md-tab-button"] +
        jfContent[select="md-tab-content"]
    `,
    dependencies : {
        tabs : "mdTabs",
    },
    bindings : {
        is_disabled  : "<isDisabled",
        is_activated : "!isActivated",
    },
    controller      : MDTabController,
    controller_name : "$md_tab"
};
