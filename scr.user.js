// ==UserScript==
// @name                Selection and Copying Restorer
// @version             0.1
// @description         Unlock right-click, remove restrictions on copy, cut, select text, right-click menu, text copying, text selection, image right-click, and enhance functionality: Alt key hyperlink text selection
// @namespace           https://greasyfork.org/users/1300060
// @author              AstralRift
// @run-at              document-start
// @match               *://*/*
// @exclude             /^https?://\S+\.(txt|png|jpg|jpeg|gif|xml|svg|manifest|log|ini)[^\/]*$/
// @exclude             https://github.dev/*
// @exclude             https://vscode.dev/*
// @exclude             https://www.photopea.com/*
// @exclude             https://www.google.com/maps/*
// @exclude             https://docs.google.com/*
// @exclude             https://drive.google.com/*
// @exclude             https://mail.google.com/*
// @exclude             https://www.dropbox.com/*
// @exclude             https://outlook.live.com/mail/*
// @exclude             https://www.terabox.com/*
// @exclude             https://leetcode.cn/*
// @exclude             https://facebook.com/*
// @exclude             https://m.facebook.com/*
// @grant               GM_registerMenuCommand
// @grant               GM_unregisterMenuCommand
// @grant               GM.setValue
// @grant               GM.getValue
// @grant               GM_addValueChangeListener
// @grant               unsafeWindow
// @inject-into         page
// @license             MIT
// @downloadURL https://update.greasyfork.org/scripts/494674/Selection%20and%20Copying%20Restorer.user.js
// @updateURL https://update.greasyfork.org/scripts/494674/Selection%20and%20Copying%20Restorer.meta.js
// ==/UserScript==

(async function() {
    'use strict';

    function getSelectionText() {
        return window.getSelection ? window.getSelection().toString() : '';
    }

    function unlockTextSelection() {
        document.querySelectorAll('*').forEach(el => {
            el.style.userSelect = 'text';
            el.style.webkitUserSelect = 'text';
            el.style.MozUserSelect = 'text';
        });
    }

    unlockTextSelection();

    document.addEventListener('contextmenu', event => event.stopPropagation(), true);
    document.addEventListener('copy', event => {
        if (!getSelectionText()) {
            event.preventDefault();
        }
    }, true);

    document.addEventListener('cut', event => {
        if (!getSelectionText()) {
            event.preventDefault();
        }
    }, true);

    document.addEventListener('keydown', function(event) {
        if (event.altKey && (event.key === 'c' || event.key === 'C')) {
            navigator.clipboard.writeText(getSelectionText()).then(() => {
                console.log('Text copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    });
})();
