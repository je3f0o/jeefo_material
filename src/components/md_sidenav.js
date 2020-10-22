/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_sidenav.js
* Created at  : 2019-06-21
* Updated at  : 2020-06-09
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

const Observer = require("@jeefo/observer");
const backdrop = require("../utils/backdrop");

const prop_mode          = Symbol("mode");
const prop_isOpen        = Symbol("isOpen");
const prop_position      = Symbol("position");
const prop_hasBackdrop   = Symbol("backdrop");
const prop_backdropClass = Symbol("backdropClass");

class MDSidenavOptions {
    get mode         () { return this.instance[prop_mode] || "side";       }
    get position     () { return this.instance[prop_position] || "left";   }
    get has_backdrop () { return Boolean(this.instance[prop_hasBackdrop]); }

    get is_open ()      { return this.instance[prop_isOpen];  }
    set is_open (value) { this.instance[prop_isOpen] = value; }

    constructor (instance, $element) {
        this.$element = $element;
        this.instance = instance;
    }
}

class MDSidenavSideController {
    constructor (options) {
        this.options = options;
        const { $element } = options;

        const set_styles = () => {
            const $wrapper = this.$wrapper = $element.parent().parent();
            const $content = this.$content = $wrapper.first(
                ".md-sidenav-content"
            );

            const { width } = $element;
            $wrapper.style("width", `calc(100% + ${width}px)`);

            switch (options.position.toLowerCase()) {
                case "left" :
                    $element.style("left", 0);
                    $wrapper.style("marginLeft", `-${width}px`);
                    $content.style("paddingLeft", `${width}px`);
                    break;
                case "right" :
                    $element.style("right", 0);
                    $wrapper.style("marginRight", `-${width}px`);
                    $content.style("paddingRight", `${width}px`);
                    break;
            }

            if (options.is_open) {
                this.open();
                $element.trigger_reflow();
            }

            $wrapper.add_class("md-sidenav-mode-side");
            options.is_rendered = true;
        };

        if (options.is_rendered) {
            set_styles();
        } else {
            $element.once("render", set_styles);
        }
    }

    open () {
        const { $wrapper, options : { $element, position } } = this;

        switch (position.toLowerCase()) {
            case "left" :
                $wrapper.style("paddingLeft", `${$element.width}px`);
                break;
            case "right" :
                $wrapper.style("paddingRight", `${$element.width}px`);
                break;
        }
    }

    close () {
        const { $wrapper, options : { position } } = this;

        switch (position.toLowerCase()) {
            case "left" :
                $wrapper.style("paddingLeft", null);
                break;
            case "right" :
                $wrapper.style("paddingRight", null);
                break;
        }
    }

    destroy () {
        if (! this.options.is_rendered) { return; }

        const { $wrapper, $content, options : { $element, position } } = this;

        switch (position.toLowerCase()) {
            case "left" :
                $element.style("left", null);
                $wrapper.style("marginLeft", null);
                $wrapper.style("paddingLeft", null);
                $content.style("paddingLeft", null);
                break;
            case "right" :
                $element.style("right", null);
                $wrapper.style("marginRight", null);
                $wrapper.style("paddingRight", null);
                $content.style("paddingRight", null);
                break;
        }
        $wrapper.style("width", null);
        $wrapper.remove_class("md-sidenav-mode-side");
    }
}

class MDSidenavOverController {
    constructor (options) {
        this.options = options;
        const { $element } = options;

        const set_styles = () => {
            if (options.is_open) {
                this.open();
            } else {
                this.close();
            }
            $element.trigger_reflow();

            $element.add_class("md-sidenav-mode-over");
            options.is_rendered = true;
        };

        if (options.is_rendered) {
            set_styles();
        } else {
            $element.once("render", set_styles);
        }
    }

    open () {
        const { $element, position, has_backdrop } = this.options;
        switch (position.toLowerCase()) {
            case "left" :
                $element.style("marginLeft", 0);
                break;
            case "right" :
                $element.style("marginRight", 0);
                break;
        }

        if (has_backdrop) {
            this.$backdrop = backdrop($element.parent());
            this.$backdrop.once("click", () => this.close());
            $element.style("zIndex", 101);
        }
    }

    close () {
        const { $element, position } = this.options;
        switch (position.toLowerCase()) {
            case "left" :
                $element.style("marginLeft", `-${$element.width}px`);
                break;
            case "right" :
                $element.style("marginRight", `-${$element.width}px`);
                break;
        }

        if (this.options.is_open) {
            if (this.$backdrop) {
                $element.style("zIndex", null);
                this.$backdrop.remove();
                this.$backdrop = null;
            }

            this.options.is_open = false;
        }
    }

    destroy () {
        const { $element } = this.options;
        $element.style("zIndex", null);
        $element.style("marginLeft", null);
        $element.remove_class("md-sidenav-mode-over");
        if (this.$backdrop) {
            this.$backdrop.remove();
            this.$backdrop = null;
        }
    }
}

module.exports = {
    selector : "md-sidenav",
    bindings : {
        [prop_mode]          : "@mode",
        [prop_isOpen]        : "=isOpen",
        [prop_position]      : "@position",
        [prop_hasBackdrop]   : "<backdrop",
        [prop_backdropClass] : "@backdropClass",
    },

    controller : class MDSidenav {
        on_init ($element) {
            const options  = new MDSidenavOptions(this, $element);
            const observer = new Observer(this);
            let controller;

            const set_controller = mode => {
                if (controller) { controller.destroy(); }

                switch (mode) {
                    case "side" :
                        controller = new MDSidenavSideController(options);
                        break;
                    case "over"    :
                    case undefined :
                        controller = new MDSidenavOverController(options);
                        break;
                    case "push" :
                        break;
                    default:
                        throw new Error("Invalid mode");
                }
            };

            observer.on(prop_mode, set_controller);

            observer.on(prop_isOpen, is_open => {
                if (options.is_rendered) {
                    if (is_open) {
                        controller.open();
                    } else {
                        controller.close();
                    }
                }
            });

            set_controller(options.mode.toLowerCase());
        }

        open () {
            if (! this[prop_isOpen]) {
                this[prop_isOpen] = true;
            }
        }

        close () {
            if (this[prop_isOpen]) {
                this[prop_isOpen] = false;
            }
        }

        toggle () {
            this[prop_isOpen] = ! this[prop_isOpen];
        }
    },
    controller_as : "$md_sidenav",
};
