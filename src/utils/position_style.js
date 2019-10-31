/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : position_style.js
* Created at  : 2019-10-08
* Updated at  : 2019-10-08
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

const _types = ["string", "number"];
const _sides = ["top", "right", "bottom", "left"];

const position = (position_value, values) => {
    let props;
    if (_types.includes(typeof values)) {
        props = _sides.map(side => `${ side } : ${ values }`);
    } else {
        props = _sides.filter(side => {
            return values[side] !== undefined;
        }).map(side => `${ side } : ${ values[side] }`);
    }
    return `position: ${ position_value }; ${ props.join("; ") };`;
};

class PositionStyleService {
    abs (values) {
        return position("absolute", values);
    }

    rel (values) {
        return position("relative", values);
    }

    fix (values) {
        return position("fixed", values);
    }
}

module.exports = new PositionStyleService();
