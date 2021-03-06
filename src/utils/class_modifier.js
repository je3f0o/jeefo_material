/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : class_modifier.js
* Created at  : 2020-10-31
* Updated at  : 2021-02-04
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

module.exports = (element, root_class, modifiers) => value => {
    const others = modifiers.filter(v => v !== value)
                            .map(v => `${root_class}--${v}`);
    element.classList.remove(...others);

    if (value && typeof value === "string") {
        value = value.toLowerCase();
        if (! modifiers.includes(value)) {
            return console.warn(
                `Invalid modifier class '${value}' found in '${root_class}'`
            );
        }
        element.classList.add(`${root_class}--${value}`);
    }
};
