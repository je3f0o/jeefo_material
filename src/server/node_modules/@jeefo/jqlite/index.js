/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2017-08-08
* Updated at  : 2020-10-22
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const JeefoElement   = require("./jeefo_element");
const JeefoDOMParser = require("./dom_parser");

const is_valid_node = n => n instanceof Element || n instanceof Comment;

module.exports = function (element) {
	if (element instanceof JeefoElement) {
        return new JeefoElement(element.DOM_element);
    } else if (is_valid_node(element)) {
        return new JeefoElement(element);
    } else if (typeof element === "string") {
        // Convert html text into DOM nodes
        const elements = JeefoDOMParser.parse(element);
        if (elements.length !== 1 || ! is_valid_node(elements[0])) {
            throw new Error("Invalid HTML");
        }

        return new JeefoElement(elements[0]);
	}

    throw new Error("Invalid argument: jqlite(element)");
};
