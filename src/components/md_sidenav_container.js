/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_sidenav_container.js
* Created at  : 2019-06-21
* Updated at  : 2019-12-11
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
/* css */
md-sidenav-container {
    z-index  : 0;
    display  : block;
    overflow : hidden;
    position : relative;
}
.md-sidenav-wrapper {
    box-sizing : border-box;
}
.md-sidenav-wrapper.md-sidenav-mode-side {
    transition : padding-left .4s cubic-bezier(.25,.8,.25,1),
                 padding-right .4s cubic-bezier(.25,.8,.25,1);
}
.md-sidenav-viewport {
    position : relative;
}
.md-sidenav-wrapper,
.md-sidenav-viewport,
.md-sidenav-content {
    height : 100%;
}
md-sidenav {
    top        : 0;
    width      : 320px;
    bottom     : 0;
    z-index    : 2;
    position   : absolute;
    box-sizing : border-box;
}
md-sidenav.md-sidenav-mode-over {
    transition : margin-left .4s cubic-bezier(.25,.8,.25,1),
                 margin-right .4s cubic-bezier(.25,.8,.25,1);
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
        .md-sidenav-wrapper >
            .md-sidenav-viewport >
                .md-sidenav-content >
                    jfContent ^
                jfContent[select="md-sidenav"]
    `,
};
