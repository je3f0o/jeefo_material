/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_tabs.js
* Created at  : 2019-07-04
* Updated at  : 2019-10-06
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

const EventEmitter = require("@jeefo/utils/event_emitter");
const array_remove = require("@jeefo/utils/array/remove");

const style = `
md-tabs {
    margin        : 0;
    display       : block;
    overflow      : hidden;
    position      : relative;
    border-radius : 2px;
}
md-tabs[md-border-bottom] > .md-tabs-header {
    border-width: 0 0 1px;
    border-style: solid;
}
.md-tabs-wrapper {
    display: none;
}
.md-tabs-header {
    position : relative;
}
.md-tabs-canvas {
    height     : 48px;
    overflow   : hidden;
    position   : relative;
    box-sizing : border-box;
}
.md-tabs-pagination {
    height    : 48px;
    min-width : 100%;

    position   : absolute;
    left       : 0;
    transform  : translate3d(0,0,0);
    transition : transform .5s cubic-bezier(.35,0,.25,1);
}
.md-tabs-pagination:after {
    clear   : both;
    content : '';
    display : table;
}
md-tab-label {
    float          : left;
    font-size      : 14px;
    font-weight    : 500;
    line-height    : 24px;
    text-align     : center;
    text-transform : uppercase;
    cursor         : pointer;
    padding        : 12px 16px;
    position       : relative;
    overflow       : hidden;
    text-overflow  : ellipsis;
    white-space    : nowrap;

    transition : background-color .35s cubic-bezier(.35,0,.25,1);
}
md-tab-label > md-icon {
    margin-right: 8px;
}
.md-ink-bar {
    height   : 3px;
    position : absolute;
    left     : auto;
    right    : auto;
    bottom   : 0;
}
.md-ink-bar.md-left {
    transition :
        left  .125s cubic-bezier(.35,0,.25,1),
        right  .25s cubic-bezier(.35,0,.25,1);
}
.md-ink-bar.md-right {
    transition :
        left   .25s cubic-bezier(.35,0,.25,1),
        right .125s cubic-bezier(.35,0,.25,1);
}
.md-tabs-content-wrapper {
    overflow   : hidden;
    position   : relative;
    transition : 0.5s cubic-bezier(0.35, 0, 0.25, 1);
}
md-tab-body {
    display  : block;
    overflow : hidden;

    position   : absolute;
    top        : 0;
    left       : 0;
    right      : 0;
    transform  : translateX(0);
    transition : transform .5s cubic-bezier(.35,0,.25,1);
}
md-tab-body.md-active {
    position: relative;
}
md-tab-body.md-left:not(.md-active) {
    transform : translateX(-100%);
}
md-tab-body.md-right:not(.md-active) {
    transform : translateX(100%);
}
md-tab-body.md-left:not(.md-active) *,
md-tab-body.md-right:not(.md-active) * {
    visibility       : hidden;
    transition       : visibility 0s linear;
    transition-delay : .5s;
}
.no-transition {
    transition-property : none;
}

md-tabs[type~="bordered"] .md-tabs-canvas {
    border-bottom-width : 1px;
    border-bottom-style : solid;
}
md-tabs[type~="fixed"] .md-tabs-pagination {
    display: flex;
}
md-tabs[type~="fixed"] md-tab-label {
    flex-grow: 1;
}
`;

const labels_prop    = Symbol("(labels)");
const instance_prop  = "(get_instance)";
const on_change_prop = "(on_change)";

const CAPTURE_COLORS = (new Array(4)).fill(1).map(() => {
    return "\\s*(\\d+)\\s*";
}).join(',');
const RGBA_REGEX = new RegExp(`^rgba\\s*\\(${ CAPTURE_COLORS }\\)$`, 'i');

class MDTabsController extends EventEmitter {
    on_init ($element) {
        this.$tabs            = [];
        this[labels_prop]     = [];
        this.$element         = $element;
        this.$ink_bar         = $element.first(".md-ink-bar");
        this.$pagination      = $element.first(".md-tabs-pagination");
        this.$content_wrapper = $element.first(".md-tabs-content-wrapper");
        this._content_height  = 0;

        $element.once("renderable", () => {
            this.render();
            if (! this.active_tab) { return; }

            const { $ink_bar, active_tab:{$label} } = this;
            const ink_style = $ink_bar.get_computed_style();
            const matches = ink_style.backgroundColor.match(RGBA_REGEX);

            if (matches && matches[4] === '0') {
                const label_color = $label.get_computed_style().color;
                this.$ink_bar.style("backgroundColor", label_color);
            }
        });

        if (typeof this[on_change_prop] === "function") {
            this.on("change", this[on_change_prop]);
        }
        if (this[instance_prop]) {
            this[instance_prop](this);
        }
    }

    on_digest () {
        if (! this.$is_auto_height_disabled) {
            this.set_content_height();
        }
        if (this.active_tab) {
            const label_el = this.active_tab.$label.DOM_element;
            const {offsetLeft, offsetRight} = label_el;
            const is_ink_moved = (
                offsetLeft  !== this.ink_offset_left ||
                offsetRight !== this.ink_offset_right
            );
            if (is_ink_moved) {
                this._reposition_ink_bar(offsetLeft);
            }
        } else {
            this.$ink_bar.remove_attr("style");
        }
    }

    _reposition_ink_bar (left) {
        if (left > this.ink_offset_left && this.direction !== 1) {
            this.direction = 1;
        } else if (left < this.ink_offset_left && this.direction !== 0) {
            this.direction = 0;
        }

        if (this.direction === 1) {
            this.$ink_bar.replace_class("md-left", "md-right");
        } else {
            this.$ink_bar.replace_class("md-right", "md-left");
        }

        const label_width = this.active_tab.$label.width;
        const right = this.$pagination.width - left - label_width;
        this.$ink_bar.css({
            left  : `${ left }px`,
            right : `${ right }px`,
        });

        this.ink_offset_left  = left;
        this.ink_offset_right = right;
    }

    set_content_height () {
        if (! this.active_tab || ! this.active_tab.$body) { return; }

        const body_height = this.active_tab.$body.height;
        if (this._content_height !== body_height) {
            this._content_height         = body_height;
            this.$content_wrapper.height = body_height;
        }
    }

    add (tab) {
        if (this.$tabs.length === 0) {
            this.active_tab = tab;
        }
        this.$tabs.push(tab);
    }

    remove (tab) {
        array_remove(this.$tabs, tab);

        if (this.$tabs.length) {
            if (this.active_tab === tab) {
                this.active_tab = this.$tabs[0];
                this.active_tab.active();
            }
        } else {
            this.$content_wrapper.css("height", 0);
            this.$ink_bar.remove_attr("style");
        }
    }

    reorder () {
        let is_right;
        this.$tabs.forEach(tab => {
            if (tab === this.active_tab) {
                is_right      = true;
                tab.direction = 0;
                tab.$body.remove_class("md-left", "md-right");
            } else if (is_right) {
                if (tab.direction !== 1) {
                    tab.direction = 1;
                    tab.$body.replace_class("md-left", "md-right");
                }
            } else if (tab.direction !== -1) {
                tab.direction = -1;
                tab.$body.replace_class("md-right", "md-left");
            }
        });
    }

    render () {
        this.reorder();
        if (this.active_tab) { this.active_tab.active(); }
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
    style,
    template : `
        { jt }
        .md-tabs-wrapper >
            jfContent[select="md-tab"] ^
        .md-tabs-header >
            .nav-buttons >
                jfContent[select="md-tabs-prev-button"] +
                jfContent[select="md-tabs-next-button"] ^
            .md-tabs-canvas >
                .md-tabs-pagination >
                    .md-ink-bar
            ^   ^   ^
        .md-tabs-content-wrapper
    `,
    bindings : {
        [instance_prop]          : "!getInstance",
        [on_change_prop]         : "!onChange",
        $has_paginator           : "<paginator",
        $is_disabled             : "<isDisabled",
        $is_auto_height_disabled : "<disableAutoHeight",
    },
    controller      : MDTabsController,
    controller_name : "$md_tabs",
};
