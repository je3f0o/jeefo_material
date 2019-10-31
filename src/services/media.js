/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : media.js
* Created at  : 2019-10-06
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

const EventEmiiter = require("@jeefo/utils/event_emitter");

const get_breakpoint = width => {
    if (width >= 1920) {
        return "xl";
    } else if (width >= 1280) {
        return "lg";
    } else if (width >= 960) {
        return "md";
    } else if (width >= 600) {
        return "sm";
    }
    return "xs";
};

class MDMediaService extends EventEmiiter {
    constructor () {
        super();
        window.addEventListener("resize", () => {
            const breakpoint = get_breakpoint(window.innerWidth);
            if (breakpoint !== this.breakpoint) {
                this.breakpoint = breakpoint;
                this.emit("breakpoint_changed", breakpoint);
            }
        });
        this.breakpoint = get_breakpoint(window.innerWidth);
    }

    is (breakpoint) {
        if (breakpoint === this.breakpoint) {
            return true;
        }
        switch (breakpoint) {
            case "gt-xs" :
                return this.breakpoint !== "xs";
            case "gt-sm" :
                return ["sm", "lg", "xl"].includes(this.breakpoint);
            case "gt-md" :
                return ["lg", "xl"].includes(this.breakpoint);
            case "gt-lg" :
                return this.breakpoint === "xl";
        }
    }
}

module.exports = new MDMediaService();
