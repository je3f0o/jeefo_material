/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : register.js
* Created at  : 2021-01-14
* Updated at  : 2021-02-28
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

const router = require("@jeefo/state");

router.register("main"            , require("./main_state"));
router.register("main.card"       , require("./main.card_state"));
router.register("main.fabs"       , require("./main.fabs_state"));
router.register("main.button"     , require("./main.button_state"));
router.register("main.inputs"     , require("./main.inputs_state"));
router.register("main.selection"  , require("./main.selection_state"));
router.register("main.tabs"       , require("./main.tabs_state"));
router.register("main.list"       , require("./main.list_state"));
router.register("main.surface"    , require("./main.surface_state"));
router.register("main.sidenav"    , require("./main.sidenav_state"));
router.register("main.scrollable" , require("./main.scrollable_state"));
