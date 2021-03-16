/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : jeefo_elements.js
* Created at  : 2019-06-27
* Updated at  : 2019-10-04
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

const JeefoElement = require("./jeefo_element");

class JeefoElements {
    constructor (elements) {
        this.length = elements.length;
        for (let i = 0; i < elements.length; ++i) {
            this[i] = elements[i];
        }
    }

	eq (index) {
		return new JeefoElement(this[index]);
	}

	first (query) {
        for (let i = 0; i < this.length; i += 1) {
            const node = this[i].querySelector(query);
            if (node) { return new JeefoElement(node); }
        }
        return null;
	}

	find (query) {
        const elements = [];
        for (let i = 0; i < this.length; i += 1) {
            const nodes = this[i].querySelectorAll(query);
            for (let j = 0; j < nodes.length; j += 1) {
                elements.push(nodes[j]);
            }
        }
        return new JeefoElements(elements);
	}

	remove () {
		for (let i = 0; i < this.length; ++i) {
			this[i].parentNode.removeChild(this[i]);
		}
	}

	text (value) {
		if (value === undefined) {
			value = '';
			for (let i = 0; i < this.length; ++i) {
                // TODO: research about is textContent right?
				value += this[i].textContent;
			}
			return value;
		}
		for (let i = 0; i < this.length; ++i) {
			this[i].textContent = value;
		}
	}
}

module.exports = JeefoElements;
