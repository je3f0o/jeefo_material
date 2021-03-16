/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : jeefo_element.js
* Created at  : 2017-01-06
* Updated at  : 2020-10-21
* Author      : jeefo
* Purpose     :
* Description :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

/*
NODE_TYPE_ELEMENT           = 1,
NODE_TYPE_ATTRIBUTE         = 2,
NODE_TYPE_TEXT              = 3,
NODE_TYPE_COMMENT           = 8,
NODE_TYPE_DOCUMENT          = 9,
NODE_TYPE_DOCUMENT_FRAGMENT = 11

['ELEMENT_NODE', 1],
['ATTRIBUTE_NODE', 2],
['TEXT_NODE', 3],
['CDATA_SECTION_NODE', 4],
['ENTITY_REFERENCE_NODE', 5],
['ENTITY_NODE', 6],
['PROCESSING_INSTRUCTION_NODE', 7],
['COMMENT_NODE', 8],
['DOCUMENT_NODE', 9],
['DOCUMENT_TYPE_NODE', 10],
['DOCUMENT_FRAGMENT_NODE', 11],
['NOTATION_NODE', 12]
*/

//ignore:end

const dash_case = require("@jeefo/utils/string/dash_case");
const {slice}   = Array.prototype;

// Constructor
class JeefoElement {
    constructor (element) {
        this.DOM_element = element;
    }

    get value ()      { return this.DOM_element.value;  }
    set value (value) { this.DOM_element.value = value; }

    // Don't use innerText here.
    // Because innerText takes CSS styles into account, triggering reflow to
    // up-to-date computes style and computationally expensive.
	get text ()      { return this.DOM_element.textContent;  }
	set text (value) { this.DOM_element.textContent = value; }

    get name () { return this.DOM_element.tagName; }

	// DOM methods
    is (node) {
        return this.DOM_element === node;
    }
	remove () {
        if (this.DOM_element && this.DOM_element.parentNode) {
            this.DOM_element.parentNode.removeChild(this.DOM_element);
        }
        this.DOM_element = null;
        return this;
	}
	before (node) {
        if (node instanceof JeefoElement) { node = node.DOM_element; }
		this.DOM_element.parentNode.insertBefore(node, this.DOM_element);
        return this;
	}
	after (node) {
        if (node instanceof JeefoElement) { node = node.DOM_element; }
		this.DOM_element.parentNode.insertBefore(
            node, this.DOM_element.nextSibling
        );
        return this;
	}
	clone (is_deep) {
        return new JeefoElement(this.DOM_element.cloneNode(is_deep));
	}
    parent () {
        if (this.DOM_element.parentNode) {
            return new JeefoElement(this.DOM_element.parentNode);
        }
        return null;
    }
	append (node) {
        if (node instanceof JeefoElement) { node = node.DOM_element; }
		this.DOM_element.appendChild(node);
        return this;
	}
	replace_with (node) {
        if (node instanceof JeefoElement) { node = node.DOM_element; }
		this.DOM_element.replaceWith(node);
        this.DOM_element = node;
        return this;
	}
	replace (node) {
        if (node instanceof JeefoElement) { node = node.DOM_element; }
		this.DOM_element.parentNode.replaceChild(node, this.DOM_element);
        this.DOM_element = node;
        return this;
	}

	// Selector methods
	first (query) {
        const element = this.DOM_element.querySelector(query);
        return element ? new JeefoElement(element) : null;
	}
	find (query) {
        const elements = this.DOM_element.querySelectorAll(query);
        return slice.call(elements);
	}
	children (index, ...args) {
        let result = this.DOM_element.children[index];
        for (const i of args) {
            result = result.children[i];
        }
		return new JeefoElement(result);
	}
    prev () {
		return new JeefoElement(this.DOM_element.previousElementSibling);
    }
    next () {
		return new JeefoElement(this.DOM_element.nextElementSibling);
    }

	// Attribute methods
	get_attr (key, to_dash_case = true) {
		return this.DOM_element.getAttribute(
            to_dash_case ? dash_case(key) : key
        );
	}
	set_attr (key, value = '', to_dash_case = true) {
		this.DOM_element.setAttribute(
            to_dash_case ? dash_case(key) : key, value
        );
        return this;
	}
	has_attr (key, to_dash_case = true) {
		return this.DOM_element.hasAttribute(
            to_dash_case ? dash_case(key) : key
        );
	}
	remove_attr (key, to_dash_case = true) {
		this.DOM_element.removeAttribute(
            to_dash_case ? dash_case(key) : key
        );
        return this;
	}
    attrs (attrs, to_dash_case = true) {
        for (const prop of Object.keys(attrs)) {
            this.DOM_element.setAttribute(
                to_dash_case ? dash_case(prop) : prop, attrs[prop]
            );
        }
        return this;
    }
}

require("./event_methods")(JeefoElement);
require("./class_methods")(JeefoElement);
require("./style_methods")(JeefoElement);

module.exports = JeefoElement;
