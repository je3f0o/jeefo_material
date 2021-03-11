/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : main.card_state.js
* Created at  : 2021-01-19
* Updated at  : 2021-03-11
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

const theme_service = require("@jeefo/material/services/theme");

const style = `
/* sass */
@import '@jeefo/material'

.demo-card
    .header
        width       : 100%
        display     : flex
        padding     : 16px 8px 16px 16px
        box-sizing  : border-box
        align-items : start
        & > .title
            flex-grow   : 1
            margin-left : 16px
        & > .md-button
            margin-top: -8px
    &__avatar
        +size(40px)
        text-align    : center
        line-height   : 40px
        border-radius : 50%
`;

const set_avatar_color = () => {
    theme_service.set_default({
        ".demo-card__avatar": {
            "color"            : "$on_secondary-color",
            "background-color" : "$secondary-color",
        },
    });

    theme_service.register_template(`
        /* sass */
        @import '@jeefo/material'

        .demo-card__avatar
            +property-template(background-color, color)
    `);
};


const template = `
{jt}
demoBox.full.no-appbar[style="border:none"] >
    attributes >
        .demo-box__attr-title[mdEmphasis="high"](Variant) +
        mdSelection[align="middle" forEach="v in variants"] >
            mdRadio[
                name       = "variant"
                color      = "primary"
                value      = "{{ v.value }}"
                isSelected = "variant === v.value"
                (change)   = "variant = $element.value"
            ] +
            label({{ v.name }}) ^
        .demo-box__attr-title[mdEmphasis="high"](Shape) +
        mdSelection[align="middle" forEach="s in shapes"] >
            mdRadio[
                name       = "shape"
                color      = "primary"
                value      = "{{ s.value }}"
                isSelected = "shape === s.value"
                (change)   = "shape = $element.value"
            ] +
            label({{ s.name }})
        ^   ^
    .lighter-bg[style="width: 100%; padding: 16px; box-sizing: border-box;"] >
        mdCard.demo-card[
            shape   = "{{ shape }}"
            variant = "{{ variant }}"
        ] > [mdEmphasis = "medium"] >
            .header >
                .demo-card__avatar(J) +
                .title >
                    mdTypography[variant="subtitle-1" mdEmphasis="high"](Shrimp and Chorizo Paella) +
                    mdTypography[variant="subtitle-2" style="margin-top: 2px;"](September 14, 2016) ^
                mdButton[
                    size      = "medium"
                    variant   = "icon"
                    (mouseup) = "$demo_box.is_open = true;"
                ] >
                    mdIcon[name="more_vert"]
                ^   ^
            mdImage[
                src="https://material-ui.com/static/images/cards/paella.jpg"
                style="width: 100%;"
            ] +
            mdTypography[
                style      = "padding: 16px; display: block;"
                variant    = "body-2"
                mdEmphasis = "medium"
            ](This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.) +
            mdDivider +
            [style="padding: 8px; display: flex;"] >
                mdButton[variant="icon" size="medium"] >
                    mdIcon[name="favorite"] ^
                mdButton[variant="icon" size="medium"] >
                    mdIcon[name="share"] ^
                mdButton[variant="icon" size="medium" style="margin-left: auto;"] >
                    mdIcon[name="expand_more"]
`;

class MDCardState {
    static get url      () { return "card"; }
    static get style    () { return style;  }
    static get template () { return template;  }

    on_init ($element) {
        this.shape   = '';
        this.variant = '';

        $element.on("initialized", set_avatar_color);

        this.shapes = [
            {name: "Rounded (default)", value: ''},
            {name: "Square" , value: "square"},
        ];
        this.variants = [
            {name: "Elevated (default)", value: ''},
            {name: "Outlined", value: "outlined"},
        ];
    }
}

module.exports = MDCardState;
