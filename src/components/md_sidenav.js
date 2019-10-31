/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_sidenav.js
* Created at  : 2019-06-21
* Updated at  : 2019-09-13
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

const jqlite     = require("@jeefo/jqlite");
const Observer   = require("@jeefo/observer");
const capitalize = require("@jeefo/utils/string/capitalize");

const calculate_slider = props => {
    const { width, margin, $slider, $content_wrapper } = props;
    $slider.css({
        width    : `calc(100% + ${ width })`,
        [margin] : `-${ width }`,
    });
    $content_wrapper.style(margin, width);
};

const change_handler = (is_open, props) => {
    const { width, padding, $slider } = props;
    $slider.style(padding, is_open ? width : null);
};

module.exports = {
    selector : "md-sidenav",
    bindings : {
        mode             : "@mode",
        is_open          : "=isOpen",
        position         : "@position",
        backdrop_class   : "@backdropClass",
        disable_backdrop : "<disableBackdrop"
    },
    dependencies : {
        "(md_sidenav_container)" : "mdSidenavContainer"
    },
    controller : {
        on_init : function ($element) {
            this.mode     = this.mode || "side";
            this.$element = $element;
            const $container = this["(md_sidenav_container)"];
            const $slider    = $container.$slider;

            if (typeof this.position === "string") {
                this.position = this.position.toLowerCase();
                if (! ["left", "right"].includes(this.position)) {
                    throw new Error("Invalid position");
                }
            } else if (this.position === void 0 || this.position === null) {
                this.position = "left";
            } else {
                throw new Error("Invalid position");
            }
            $element.style(this.position, "0px");

            const position = capitalize(this.position);
            const props = this._properties = {
                $slider,
                margin           : `margin${ position }`,
                padding          : `padding${ position }`,
                $content_wrapper : $container.$content_wrapper,
            };

            $element.once("renderable", () => {
                this._properties.width = `${ $element.width }px`;
                $slider.style("transition", "none");
                calculate_slider(props);
                change_handler(this.is_open, props);
                setTimeout(() => {
                    $slider.style("transition", null);
                });
            });

            const observer = new Observer(this);
            observer.on("is_open", is_open => change_handler(is_open, props));
        },
        push : function () {

        },
        side : function () {
            return
            var width = this.$element.width();
            if (this.$width !== width || this.$_side !== this.position) {
                this.$_side = this.position;
                this.$width = width;
            }

            this.$content_wrapper.css(this.$_side === "right" ? "marginRight" : "marginLeft", `${ width }px`);
        },
        open : function () {
            return
            if (! this.disable_backdrop && ! this.$backdrop) {
                let _class = "md-sidenav-backdrop";
                if (this.backdrop_class) {
                    _class += ` ${ this.backdrop_class }`;
                }
                this.$backdrop = jqlite(`<div class="${ _class }" style="z-index : ${ this.$container.$z };"></div>`);
                this.$content_wrapper.append(this.$backdrop);

                this.$backdrop.on("click", () => {
                    this.is_open = false;
                    this.close();
                });
            }

            if (! this.$is_opened) {
                this.$element.css("zIndex", this.$container.$z + 1);
                this.$container.$z += 2;

                this.$element.add_class("open");
                this.$is_opened = true;
            }

            switch (this.mode) {
                //case "push" : this.$push(); break;
                case "side" :
                    this.$side();
                    break;
                default: // over
            }
        },
        close : function () {
            return
            if (this.$backdrop) {
                this.$backdrop.remove();
                this.$backdrop = null;
            }

            if (this.$is_opened) {
                this.$element.css("zIndex", null);
                this.$element.remove_class("open");

                this.$is_opened = false;
                this.$container.$z -= 2;

                if (this.$width) {
                    this.$content_wrapper.css(this.$_side === "right" ? "marginRight" : "marginLeft", 0);
                }
            }
        },
        $toggle : function () {
            this.is_open = ! this.is_open;
        },
    },
    controller_as : "$md_sidenav",
};
