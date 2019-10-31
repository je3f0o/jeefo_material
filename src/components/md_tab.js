/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_tab.js
* Created at  : 2019-07-05
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

const EventEmitter = require("@jeefo/utils/event_emitter");

const tabs_prop = "(md_tabs)";

class MDTabController extends EventEmitter {
    on_init () {
        this[tabs_prop].add(this);
        this.is_activated = false;
        if (this["on-active"]) {
            this.on("activated", this["on-active"]);
        }
        if (this["on-active-once"]) {
            this.once("activated", this["on-active-once"]);
        }
    }

    on_destroy () {
        this[tabs_prop].remove(this);
    }

    active () {
        const md_tabs = this[tabs_prop];
        if (md_tabs.active_tab === this) {
            if (this.is_activated) { return; }
        } else {
            md_tabs.active_tab.deactive();
        }

        if (this.$label) {
            md_tabs._reposition_ink_bar(this.$label.DOM_element.offsetLeft);
            if (! md_tabs.is_ink_disabled) {
                this.$label.add_class("md-active");
            }
        }

        this.$body.add_class("md-active");
        this.is_activated = true;

        md_tabs.active_tab = this;
        md_tabs.reorder();

        this.emit("activated");
        const index = md_tabs.$tabs.indexOf(this);
        md_tabs.emit("change", { index });
    }

    deactive () {
        this.$body.remove_class("md-active");
        if (this.$label) {
            this.$label.remove_class("md-active");
        }
        this.is_activated = false;
        this.emit("deactivated");
    }

    set_body ($body) {
        this.$body = $body;
        this[tabs_prop].$content_wrapper.append($body);
    }
}

module.exports = {
    selector     : "md-tab",
    dependencies : {
        [tabs_prop] : "mdTabs",
    },
    bindings : {
        ["on-active"]      : "!onActive",
        ["on-active-once"] : "!onActiveOnce",
    },
    controller : MDTabController,
};
