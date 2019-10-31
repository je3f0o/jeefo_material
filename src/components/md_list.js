/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_list.js
* Created at  : 2019-10-07
* Updated at  : 2019-10-07
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

module.exports = {
    selector : "md-list",

    style : `
        md-list {
            display : block;
            padding : 8px 0;
        }
    `,

    template : `
        { jt }
        jfContent[select="md-list-item"] +
        jfContent[select="md-list-divider"]
    `,

    controller : class MDList {

    }
};
