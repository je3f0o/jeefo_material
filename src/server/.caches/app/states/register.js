 jeefo.register("./states/register.js", async (exports, module) => { const __dirname = "./states", __filename = "./states/register.js"; const require = path => { return jeefo.require(path, __filename, __dirname); }; /* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : register.js
* Created at  : 2021-01-14
* Updated at  : 2021-03-08
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

const router = (await require("@jeefo/state"));

router.register("main"            , (await require("./main_state")));
router.register("main.card"       , (await require("./main.card_state")));
router.register("main.fabs"       , (await require("./main.fabs_state")));
router.register("main.button"     , (await require("./main.button_state")));
router.register("main.inputs"     , (await require("./main.inputs_state")));
router.register("main.selection"  , (await require("./main.selection_state")));
router.register("main.tabs"       , (await require("./main.tabs_state")));
router.register("main.list"       , (await require("./main.list_state")));
router.register("main.settings"   , (await require("./main.settings_state")));
router.register("main.shader"     , (await require("./main.shader_state")));
router.register("main.surface"    , (await require("./main.surface_state")));
router.register("main.sidenav"    , (await require("./main.sidenav_state")));
router.register("main.scrollable" , (await require("./main.scrollable_state")));
 }); 
//# sourceURL=./states/register.js 