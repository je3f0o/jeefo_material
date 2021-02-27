/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2019-06-21
* Updated at  : 2021-02-23
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
const backdrop = require("../../utils/backdrop");

const root = "md-sidenav";

class MDSidenavOptions {
    get variant      () { return this.instance.variant  || "side"; }
    get position     () { return this.instance.position || "left";   }
    get has_backdrop () { return this.instance.has_backdrop; }

    get is_open ()      { return this.instance.is_open;  }
    set is_open (value) { this.instance.is_open = value; }

    constructor (instance, $element) {
        this.$element = $element;
        this.instance = instance;
    }
}

class BaseController {
    constructor (options) {
        this.options = options;
        this._change_position(options.position);
    }

    _change_position (value) {
        const {$element} = this.options;
        switch (value) {
            case "left":
                $element.remove_class(`${root}--right`);
                $element.add_class(`${root}--left`);
                break;
            case "right":
                $element.remove_class(`${root}--left`);
                $element.add_class(`${root}--right`);
                break;
        }
    }
}

class MDSidenavSideController extends BaseController {
    constructor (options) {
        super(options);
        this.class_name = `${root}--side`;

        const {$element} = options;
        const $wrapper = this.$wrapper = $element.parent().parent();
        const $content = this.$content = $wrapper.first(
            ".md-sidenav-container__content"
        );

        const {width} = $element;
        $wrapper.style("width", `calc(100% + ${width}px)`);
        $element.add_class(this.class_name);

        switch (options.position.toLowerCase()) {
            case "left" :
                $element.remove_class(this.side_class_name);
                this.side_class_name = `${root}--left`;
                $element.add_class(this.side_class_name);
                $content.style("paddingLeft", `${width}px`);
                $wrapper.style("marginLeft", `-${width}px`);
                break;
            case "right" :
                $element.remove_class(this.side_class_name);
                this.side_class_name = `${root}--right`;
                $element.add_class(this.side_class_name);
                $content.style("paddingRight", `${width}px`);
                $wrapper.style("marginRight", `-${width}px`);
                break;
        }

        if (options.is_open) this.open();
        $wrapper.style("transition", "none");
        $wrapper.trigger_reflow();
        $wrapper.style("transition", null);
    }

    open () {
        const {$wrapper, options: {$element, position}} = this;

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
        const {$wrapper, options: {position}} = this;

        switch (position.toLowerCase()) {
            case "left" :
                $wrapper.style("paddingLeft", null);
                break;
            case "right" :
                $wrapper.style("paddingRight", null);
                break;
        }
    }

    change_position (value) {
        const {$wrapper, $content, options} = this;
        const {$element, position, is_open} = options;
        const width = `${$element.width}px`;
        this._change_position(value);

        $wrapper.style("transition", "none");
        switch (position.toLowerCase()) {
            case "left" :
                $wrapper.css({
                    marginLeft   : `-${width}`,
                    paddingLeft  : is_open ? width : null,
                    marginRight  : null,
                    paddingRight : null,
                });
                $content.css({
                    paddingLeft  : width,
                    paddingRight : null,
                });
                break;
            case "right" :
                $wrapper.css({
                    marginLeft   : null,
                    paddingLeft  : null,
                    marginRight  : `-${width}`,
                    paddingRight : is_open ? width : null,
                });
                $content.css({
                    paddingLeft  : null,
                    paddingRight : width,
                });
                break;
        }
        $wrapper.trigger_reflow();
        $wrapper.style("transition", null);
    }

    destroy () {
        const {$wrapper, $content, options: {$element, position}} = this;

        switch (position.toLowerCase()) {
            case "left" :
                $wrapper.css({
                    marginLeft  : null,
                    paddingLeft : null,
                });
                $content.style("paddingLeft", null);
                break;
            case "right" :
                $wrapper.css({
                    marginRight  : null,
                    paddingRight : null,
                });
                $content.style("paddingRight", null);
                break;
        }
        $element.remove_class(this.class_name);
        $wrapper.css({
            width      : null,
            transition : "none",
        });
        $wrapper.trigger_reflow();
        $wrapper.style("transition", null);
    }
}

class MDSidenavOverController extends BaseController {
    constructor (options) {
        super(options);
        const {$element} = options;

        this.class_name = `${root}--over`;
        $element.add_class(this.class_name);
        this[options.is_open ? "open" : "close"]();

        $element.style("transition", "none");
        $element.trigger_reflow();
        $element.style("transition", null);
    }

    open () {
        const {$element, has_backdrop} = this.options;
        $element.style("transform", `translateX(0)`);

        if (has_backdrop) {
            this.$backdrop = backdrop();
            this.$backdrop.on("click", () => this.close());
            $element.before(this.$backdrop);
        }
    }

    close () {
        const {$element, position} = this.options;
        switch (position.toLowerCase()) {
            case "left" :
                $element.style("transform", `translateX(-100%)`);
                break;
            case "right" :
                $element.style("transform", `translateX(100%)`);
                break;
        }

        if (this.$backdrop) {
            this.$backdrop.remove();
            this.$backdrop = null;
        }

        this.options.is_open = false;
    }

    change_position (value) {
        const {$element, position, is_open} = this.options;
        this._change_position(value);

        $element.style("transition", "none");
        if (! is_open) {
            switch (position.toLowerCase()) {
                case "left" :
                    $element.style("transform", `translateX(-100%)`);
                    break;
                case "right" :
                    $element.style("transform", `translateX(100%)`);
                    break;
            }
        }
        $element.trigger_reflow();
        $element.style("transition", null);
    }

    destroy () {
        const {$element} = this.options;
        $element.style("transform", null);
        $element.remove_class(this.class_name);
        if (this.$backdrop) {
            this.$backdrop.remove();
            this.$backdrop = null;
        }
    }
}

exports.selector = "md-sidenav";

exports.bindings = {
    variant       : "@",
    is_open       : "=isOpen",
    position      : "@",
    has_backdrop  : "<hasBackdrop",
    backdropClass : "@",
};

exports.template = `{jt}mdSurface > jfContent`;

exports.controller = class MDSidenav {
    on_init ($element) {
        let controller;
        const options  = new MDSidenavOptions(this, $element);
        const observer = new Observer(this);
        $element.add_class("md-sidenav");

        if ([null, void 0].includes(this.has_backdrop)) {
            this.has_backdrop = true;
        }

        $element.once("render", () => {
            const set_controller = variant => {
                if (controller) controller.destroy();

                switch (variant) {
                    case "side"    :
                    case null      :
                    case undefined :
                        controller = new MDSidenavSideController(options);
                        break;
                    case "over" :
                        controller = new MDSidenavOverController(options);
                        break;
                    case "push" :
                        break;
                    default:
                        throw new Error("Invalid variant");
                }
            };

            observer.on("variant", set_controller);
            set_controller(options.variant.toLowerCase());
            options.is_rendered = true;
        });

        observer.on("is_open", is_open => {
            if (controller) controller[is_open ? "open" : "close"]();
        });

        observer.on("position", value => {
            if (controller) controller.change_position(value);
        });
    }

    open () {
        if (! this.is_open) this.is_open = true;
    }

    close () {
        if (this.is_open) this.is_open = false;
    }

    toggle () {
        this.is_open = !this.is_open;
    }
};

exports.controller_name = "$md_sidenav";
