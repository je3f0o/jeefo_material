/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_button.js
* Created at  : 2019-07-21
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

const Observer      = require("@jeefo/observer");
const prop_disabled = Symbol("is-disabled");

module.exports = {
    selector : "md-button",
    style    : `
        .md-button {
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
            white-space     : nowrap;
            font-style      : inherit;
            font-variant    : inherit;
			border-radius   : 4px;
            vertical-align  : middle;
            text-decoration : none;
        }
        .md-button[outlined],
        .md-button[contained] {
			padding: 0 16px;
		}
        .md-button.has-icon {
			padding: 0 16px 0 12px;
		}

		.md-button.md-icon-button {
			height        : unset;
			padding       : 8px;
			min-width     : unset;
			border-radius : 0;
		}
    `,

    template : node => {
		if (node.attrs.has("router-link")) {
			node.name = 'a';
		} else if (node.attrs.has("href")) {
			node.attrs.remove("href");
			node.attrs.set("router-link", node.attrs.values.href);
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
		observer.on(prop_disabled, is_disabled => {
			if (is_disabled) {
				$element.set_attr("disabled");
			} else {
				$element.remove_attr("disabled");
			}
		});
	}
};
