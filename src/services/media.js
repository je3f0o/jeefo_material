/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : media.js
* Created at  : 2019-10-06
* Updated at  : 2021-01-24
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
    } else if (width >= 1440) {
        return "lg";
    } else if (width >= 1024) {
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
            if (this.breakpoint !== breakpoint) {
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
                return ["md", "lg", "xl"].includes(this.breakpoint);
            case "gte-sm" :
                return ["sm", "md", "lg", "xl"].includes(this.breakpoint);
            case "gt-md" :
                return ["lg", "xl"].includes(this.breakpoint);
            case "gte-md" :
                return ["md", "lg", "xl"].includes(this.breakpoint);
            case "gt-lg" :
                return this.breakpoint === "xl";
            case "gte-lg" :
                return ["lg", "xl"].includes(this.breakpoint);
        }
    }
}

module.exports = new MDMediaService();
