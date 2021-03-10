/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-08-02
* Updated at  : 2021-03-11
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

const theme_service = require("../../services/theme");

const calculate_scrollbar = (content_size, viewport_size, delta_scroll) => {
    let delta = 0;

    if (delta_scroll < 0) {
        content_size += -delta_scroll;
    } else if (delta_scroll + viewport_size > content_size) {
        content_size += delta_scroll + viewport_size - content_size;
        delta = -1;
    } else {
        delta = viewport_size / content_size * delta_scroll;
    }
    const ratio = viewport_size / content_size;
    const size = Math.round(viewport_size * ratio);
    if (delta < 0) delta = viewport_size - size;
    return {delta, size};
};

exports.style = `
/* sass */
@import '@jeefo/material'

.md-scrollable
    $scrollbar_size: 20px

    opacity    : 1
    display    : block
    overflow   : hidden
    box-sizing : border-box

    &__viewport
        +rel
        +size(100%)
        overflow: hidden

    &__scroller
        +size(100%)
        overflow            : auto
        box-sizing          : content-box
        margin-right        : -$scrollbar_size
        padding-right       : $scrollbar_size
        margin-bottom       : -$scrollbar_size
        padding-bottom      : $scrollbar_size
        overscroll-behavior : none

    &.fade-out
        opacity    : 0
        transition : opacity 250ms

    &__scrollbar
        +abs
        z-index       : 1
        //background  : red
        //border      : 2px solid green
        box-sizing    : border-box
        border-radius : 2px
        &--x
            bottom: 1px
        &--y
            right: 1px

    //&--overlay
        overflow: overlay
`;

theme_service.set_default({
    ".md-scrollable__scrollbar": {
        "background-color" : "blend($background-color, $on_background-color, .38)",
    },
    ".md-scrollable__scrollbar--x": {
        "height": "4px",
    },
    ".md-scrollable__scrollbar--y": {
        "width": "4px",
    },
});

theme_service.register_template(`
/* sass */
@import '@jeefo/material'

.md-scrollable

    &__scrollbar
        +property-template(background-color)
        &--x
            +property-template(height)
        &--y
            +property-template(width)

    //&::-webkit-scrollbar-track,
    //&::-webkit-scrollbar-thumb,
    //&::-webkit-scrollbar-thumb:hover
        +property-template(background-color)
`);

exports.template = `
{jt}
.md-scrollable__viewport >
    .md-scrollable__scroller >
        .md-scrollable__content >
            jfContent
        ^   ^
    .md-scrollable__scrollbar.md-scrollable__scrollbar--x +
    .md-scrollable__scrollbar.md-scrollable__scrollbar--y
`;

exports.bindings = {
    width         : '@',
    height        : '@',
    padding       : '@',
    paddingTop    : '@',
    paddingRight  : '@',
    paddingBottom : '@',
    paddingLeft   : '@',
};

exports.controller = class MDScrollable {
    on_init ($element) {
        const root = "md-scrollable";
        $element.add_class(root);
        const element   = $element.DOM_element;
        const $viewport = $element.first(`.${root}__viewport`);
        const $scroller = $viewport.first(`.${root}__scroller`);
        const $content  = $viewport.first(`.${root}__content`);
        const $x_bar    = $viewport.children(1);
        const $y_bar    = $viewport.children(2);
        this.props = [];

        const hide_x_bar    = () => $x_bar.style("display", "none");
        const hide_y_bar    = () => $y_bar.style("display", "none");
        const timeout_value = 2500;

        this.on_scroll = () => {
            const vp_rect        = $viewport.rect();
            const content_rect   = $content.rect();

            if (content_rect.height > vp_rect.height) {
                const result = calculate_scrollbar(
                    content_rect.height,
                    vp_rect.height,
                    $scroller.DOM_element.scrollTop
                );

                $y_bar.css({
                    top     : `${Math.round(result.delta)}px`,
                    height  : `${result.size}px`,
                    display : null,
                });
                clearTimeout(this.y_timeout_id);
                this.y_timeout_id = setTimeout(hide_y_bar, timeout_value);
            } else {
                $y_bar.style("display", "none");
            }

            if (content_rect.width > vp_rect.width) {
                const result = calculate_scrollbar(
                    content_rect.width,
                    vp_rect.width,
                    $scroller.DOM_element.scrollLeft
                );

                $x_bar.css({
                    left    : `${Math.round(result.delta)}px`,
                    width   : `${result.size}px`,
                    display : null,
                });
                clearTimeout(this.x_timeout_id);
                this.x_timeout_id = setTimeout(hide_x_bar, timeout_value);
            } else {
                $x_bar.style("display", "none");
            }
        };

        $scroller.on("scroll", this.on_scroll);
        $element.on("render", this.on_scroll);

        let timeout_id;
        this.on_orientationchange = () => {
            clearTimeout(timeout_id);
            timeout_id = setTimeout(this.on_scroll, 250);
        };
        window.addEventListener("orientationchange", this.on_orientationchange);

        //$element.on("touchmove", e => e.stopPropagation(), {passive: false});

        if (this.width  === void 0) this.width  = "100%";
        if (this.height === void 0) this.height = "100%";

        element.style.width  = this.width;
        element.style.height = this.height;

        if (this.padding) {
            element.style.padding = this.padding;
        }
        if (this.paddingTop) {
            element.style.paddingTop = this.paddingTop;
        }
        if (this.paddingRight) {
            element.style.paddingRight = this.paddingRight;
        }
        if (this.paddingBottom) {
            element.style.paddingBottom = this.paddingBottom;
        }
        if (this.paddingLeft) {
            element.style.paddingLeft = this.paddingLeft;
        }
    }

    on_destroy () {
        clearTimeout(this.x_timeout_id);
        clearTimeout(this.y_timeout_id);
        window.removeEventListener("orientationchange", this.on_orientationchange);
    }
};

exports.controller_name = "$md_scrollable";
