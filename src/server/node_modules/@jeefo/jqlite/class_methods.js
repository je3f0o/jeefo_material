/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : class_methods.js
* Created at  : 2017-08-03
* Updated at  : 2020-06-02
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

module.exports = JeefoElement => {

// ClassList
if (Element.prototype.hasOwnProperty("classList")) {
    extend_member(JeefoElement, "add_class", function () {
        this.DOM_element.classList.add.apply(
            this.DOM_element.classList, arguments
        );
    });
    extend_member(JeefoElement, "remove_class", function () {
		this.DOM_element.classList.remove.apply(
            this.DOM_element.classList, arguments
        );
    });
    extend_member(JeefoElement, "toggle_class", function (name) {
		this.DOM_element.classList.toggle(name);
    });
    extend_member(JeefoElement, "has_class", function (name) {
		return this.DOM_element.classList.contains(name);
    });
} else {
	// IE8/9, Safari
	const generate_class_regex = name => new RegExp(`(^| )${ name }( |$)`);

    extend_member(JeefoElement, "has_class", function (class_name) {
        const class_regex = generate_class_regex(class_name);
		return class_regex.test(this.DOM_element.className);
	});
    extend_member(JeefoElement, "add_class", function () {
        const dom_element = this.DOM_element;
        for (let i = 0; i < arguments.length; ++i) {
            const class_name  = arguments[i];
            const class_regex = generate_class_regex(class_name);
            if (! class_regex.test(dom_element.className)) {
                if (dom_element.className) {
                    dom_element.className += ` ${ class_name }`;
                } else {
                    dom_element.className = class_name;
                }
            }
        }
	});
    extend_member(JeefoElement, "remove_class", function () {
        const dom_element = this.DOM_element;
        for (let i = 0; i < arguments.length; ++i) {
            const class_name  = arguments[i];
            const class_regex = generate_class_regex(class_name);
            const class_names = dom_element.className;
            dom_element.className = class_names.replace(class_regex, '');
        }
	});
    extend_member(JeefoElement, "toggle_class", function (class_name) {
        if (this.has_class(class_name)) {
            this.remove_class(class_name);
            return false;
        }

        this.add_class(class_name);
        return true;
	});
}

extend_member(JeefoElement,
    "replace_class", function (old_class_name, new_class_name) {
	this.remove_class(old_class_name);
    this.add_class(new_class_name);
});

};
