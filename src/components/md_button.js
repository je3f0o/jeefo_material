/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_button.js
* Created at  : 2019-07-21
* Updated at  : 2019-12-29
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

const Observer      = require("@jeefo/observer");
const MDRipple      = require("@jeefo/material/utils/ripple");
const prop_disabled = Symbol("is-disabled");

const style = `
/* css */
.md-button {
    color           : currentColor;
    cursor          : pointer;
    border          : none;
    height          : 36px;
    min-width       : 64px;
    padding         : 0 8px;
    display         : inline-block;
    outline         : none;
    overflow        : hidden;
    position        : relative;
    box-sizing      : border-box;
    background      : transparent;
    line-height     : normal;
    white-space     : nowrap;
    font-style      : inherit;
    font-variant    : inherit;
    border-radius   : 4px;
    vertical-align  : middle;
    text-decoration : none;
}
.md-button.md-button-raised {
    padding: 0 16px;
}
.md-button.md-button-raised:not([disabled]) {
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
                0 2px 2px 0 rgba(0,0,0,.14),
                0 1px 5px 0 rgba(0,0,0,.12);
}
.md-button.md-button-raised:not([disabled]):hover {
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                0 4px 5px 0 rgba(0,0,0,.14),
                0 1px 10px 0 rgba(0,0,0,.12);
}
.md-button.md-button-raised:not([disabled]):active {
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),
                0 8px 10px 1px rgba(0,0,0,.14),
                0 3px 14px 2px rgba(0,0,0,.12);
}

/* outlined */
.md-button.md-button-outlined {
    padding: 0 16px;
}
.md-button.md-button-outlined:after {
    top            : 0;
    left           : 0;
    width          : 100%;
    height         : 100%;
    border         : 1px solid currentColor;
    opacity        : 0.5;
    content        : '';
    position       : absolute;
    box-sizing     : border-box;
    border-radius  : 4px;
    pointer-events : none;
}
.md-button.md-button-outlined:hover:after {
    opacity: 1;
}

.md-button.has-icon {
    padding: 0 16px 0 12px;
}

.md-button.md-icon-button {
    height        : unset;
    padding       : 8px;
    min-width     : unset;
    border-radius : 50%;
}
.md-button.md-block {
    display: block;
}
`;

module.exports = {
    selector : "md-button",
    style,

    template : node => {
		if (node.attrs.has("href")) {
			node.name = 'a';
		} else {
			node.name = "button";
			if (! node.attrs.has("type")) {
				node.attrs.set("type", "button");
			}
		}
		node.class_list.push("md-button");

		/*
		node.children.find(child => {
			if (child.name === "md-icon") {
				node.class_list.push("has-icon");
				return true;
			}
		});
		*/
    },

	bindings : {
		[prop_disabled] : "<isDisabled"
	},

	controller ($element) {
		const observer = new Observer(this);
        const disable_handler = is_disabled => {
			if (is_disabled) {
				$element.set_attr("disabled");
			} else {
				$element.remove_attr("disabled");
			}
		};

		observer.on(prop_disabled, disable_handler);
        disable_handler(this[prop_disabled]);

        const attr_ripple = $element.get_attr("ripple");
        if (! attr_ripple || attr_ripple.trim().toLowerCase() !== "off") {
            this.ripple = new MDRipple($element);
        }
	}
};
