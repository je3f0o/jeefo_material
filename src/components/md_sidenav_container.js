/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_sidenav_container.js
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

const style = `
md-sidenav-container {
    z-index  : 0;
    display  : block;
    overflow : hidden;
    position : relative;
}
.md-sidenav-slider-wrapper {
    box-sizing : border-box;
    transition : padding .4s cubic-bezier(.25,.8,.25,1);
}
.md-sidenav-slider {
    position: relative;
}
.md-sidenav-slider-wrapper,
.md-sidenav-slider {
    height : 100%;
}
.md-sidenav-content {
    height   : 100%;
    position : relative;
}
md-sidenav {
    top        : 0;
    bottom     : 0;
    position   : absolute;
    width      : 320px;
    z-index    : 3;
    box-sizing : border-box;
}
.md-sidenav-backdrop {
    opacity          : .48;
    z-index          : 2;
    top              : 0;
    bottom           : 0;
    right            : 0;
    left             : 0;
    position         : absolute;
    background-color : #212121;
}
`;

module.exports = {
    selector : "md-sidenav-container",
    style,
    template : `
        { jt }
        .md-sidenav-slider-wrapper >
            .md-sidenav-slider >
                .md-sidenav-wrapper >
                    jfContent[select="md-sidenav"] ^
                .md-sidenav-content >
                    jfContent
    `,
    controller : {
        on_init : function ($element) {
            this.$z               = 100;
            this.$slider          = $element.children(0);
            this.$content_wrapper = this.$slider.first(".md-sidenav-content");
        },
    },
    controller_name : "$md_sidenav_container",
};
