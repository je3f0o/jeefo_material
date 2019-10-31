/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : md_icon.js
* Created at  : 2019-07-21
* Updated at  : 2019-10-06
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

const Observer = require("@jeefo/observer");

const icons = {
    // chat
    'send'            : '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>',
    'insert_emoticon' : '<path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-.01-18C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/><path d="M15.5 11c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/><path d="M8.5 11c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/><path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>',

    // Network
	'link'    : '<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1z"/><path d="M8 13h8v-2H8v2z"/><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>',
	'storage' : '<path d="M4 17h2v2H4v-2zm-2 3h20v-4H2v4z"/><path d="M6 7H4V5h2v2zM2 4v4h20V4H2z"/><path d="M4 11h2v2H4v-2zm-2 3h20v-4H2v4z"/>',

    // Chat
	'chat'       : '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>',
	'voice_chat' : '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12l-4-3.2V14H6V6h8v3.2L18 6v8z"/>',
	'chat_bubble': '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>',

    // player
	'stop'          : '<path d="M6 6h12v12H6z"/>',
	'record'        : '<circle cx="12" cy="12" r="8"/>',
    'volume_off'    : '<path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63z"/><path d="M19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z"/><path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3z"/><path d="M12 4L9.91 6.09 12 8.18V4z"/>',
    'volume_down'   : '<path d="M18.5 12A4.5 4.5 0 0 0 16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M5 9v6h4l5 5V4L9 9H5z"/>',
    'volume_up'     : '<path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/>',
    'volume_mute'   : '<path d="M7 9v6h4l5 5V4l-5 5H7z"/>',
    'pause'         : '<path d="M6 19h4V5H6v14z"/><path d="M14 5v14h4V5h-4z"/>',
    'play_arrow'    : '<path d="M8 5v14l11-7z"/>',
    'skip_next'     : '<path d="M6 18l8.5-6L6 6v12z"/><path d="M16 6v12h2V6h-2z"/>',
    'skip_previous' : '<path d="M6 6h2v12H6z"/><path d="M9.5 12l8.5 6V6z"/>',
    'settings'      : '<path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>',
    'fullscreen'    : '<path d="M7 14H5v5h5v-2H7v-3z"/><path d="M5 10h2V7h3V5H5v5z"/><path d="M17 17h-3v2h5v-5h-2v3z"/><path d="M14 5v2h3v3h2V5h-5z"/>',
};

module.exports = {
    selector : "md-icon",
    bindings : {
        name       : "@",
        size       : '<',
        view_box   : "@viewBox",
        fill_color : "@",
    },
    style : `
        md-icon {
            display        : inline-block;
            vertical-align : middle;
        }
        md-icon > svg {
            display : block;
        }
    `,
    template : `
        { jt }
        svg[xmlns="http://www.w3.org/2000/svg"]
    `,
    controller : function ($element) {
        const $svg = $element.children(0);
        $svg.attrs({
            fill    : this.fill_color || "rgba(255,255,255, 0.87)",
            width   : this.size || 24,
            height  : this.size || 24,
            viewBox : this.view_box || "0 0 24 24"
        }, false);
        $svg.DOM_element.innerHTML = icons[this.name];

        const observer = new Observer(this);
        observer.on("name", value => {
            $svg.DOM_element.innerHTML = icons[value];
        });
        observer.on("view_box", value => {
            $svg.set_attr("viewBox", value, false);
        });
        observer.on("fill_color", value => {
            $svg.set_attr("fill", value, false);
        });
    }
};
