/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : event_methods.js
* Created at  : 2017-08-03
* Updated at  : 2020-06-25
* Author      : jeefo
* Purpose     :
* Description :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const extend_member = require("@jeefo/utils/class/extend_member");

const is_array             = Array.isArray;
const passive_event_option = { passive : true };

module.exports = JeefoElement => {

//EVENT_ALIAS = { rightclick : "contextmenu" }, // Move to Preprocessor

let supports_passive = false;
try {
	const opts = Object.defineProperty({}, "passive", {
		get : function () { supports_passive = true; }
	});
	window.addEventListener("test", null, opts);
} catch (e) {}
/*
var is_event_supported = function (el, event_name) {
	event_name = "on" + event_name;

	if (event_name in el) {
		return true;
	}

	el.setAttribute(event_name, "return;");
	return typeof el[event_name] === "function";
};
*/

// TODO: implement passive events
const is_passive_event = event_name => event_name === "passive";

const get_options = event_name => {
	if (is_passive_event(event_name)) {
		return passive_event_option;
	}
	return false;
};

// Once event
extend_member(JeefoElement, "once", function (events, event_handler) {
	const listener = this.on(events, function (event) {
        //const options = get_options(event.type);
		this.removeEventListener(event.type, listener);
		event_handler.call(this, event);
	});
    return listener;
});

// On event
extend_member(JeefoElement, "on", function (events, event_handler) {
    if (! is_array(events)) {
        events = [events];
    }

    events.forEach(event_name => {
        //const options = get_options(event_name);
        this.DOM_element.addEventListener(event_name, event_handler, false);
    });

	return event_handler;
});

// Off event
extend_member(JeefoElement, "off", function (events, event_handler) {
    if (! is_array(events)) {
        events = [events];
    }
    const DOM_element = this.DOM_element;

    events.forEach(event_name => {
        //const options = get_options(event_name);
        DOM_element.removeEventListener(event_name, event_handler, false);
    });
});

// Trigger event
// ref: https://developer.mozilla.org/en-US/docs/Web/API/Event/Event
/*
const default_options = {
    bubbles    : false,
    cancelable : false
};
options = Object.assign({}, default_options, options);
*/
extend_member(JeefoElement, "trigger", function (event_name, options) {
    if (this.DOM_element) {
        // Deprecated for old browsers
        // const event = document.createEvent("Event");
        // event.initEvent(event_name, bubble, is_cancelable);

        // new way construct Event in 2019
        const event = new Event(event_name, options);
        if (options && options.data) {
            event.data = options.data;
        }
        if (options && options.properties) {
            Object.assign(event, options.properties);
        }
        return this.DOM_element.dispatchEvent(event);
    }
    return true;
});

};
