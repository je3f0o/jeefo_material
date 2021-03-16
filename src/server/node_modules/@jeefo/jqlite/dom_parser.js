/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : dom_parser.js
* Created at  : 2020-06-05
* Updated at  : 2020-08-03
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

try {
    const dp = new DOMParser();
    dp.parseFromString('', "text/html");
} catch (e) {} finally {
    const doc = document.implementation.createHTMLDocument();
    DOMParser.prototype.stringFromString = markup => {
        doc.body.innerHTML = markup;
        return doc;
    };
}
const dom_parser = new DOMParser();

class JeefoDOMParser {
    constructor (markup) {
        this.document = dom_parser.parseFromString(markup, "text/html");
    }

    get elements () {
        return this.document.body.children;
    }

    detach () {
        const {body}   = this.document;
        const elements = [];
        // Faster way to removing child elements from parent node
        // ref: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript?answertab=votes#tab-top
        while (body.firstChild) {
            elements.push(body.firstChild);
            body.removeChild(body.firstChild);
        }
        return elements;
    }

    static parse (markup) {
        const instance = new JeefoDOMParser(markup);
        return instance.detach();
    }

    static replace (source_element, destination_element) {
        for (const attr of source_element.attributes) {
            destination_element.setAttribute(attr.name, attr.value);
        }
        while (source_element.firstChild) {
            destination_element.appendChild(source_element.firstChild);
        }
        return destination_element;
    }
}

module.exports = JeefoDOMParser;
