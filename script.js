// ==UserScript==
// @name         Business Insider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block the adblock blocker blockers!
// @author       You
// @match        https://www.businessinsider.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let timer;

  function deleteModalNodes() {
    const modalNode = document.querySelectorAll('div.tp-modal');
    const backdropNode = document.querySelectorAll('div.tp-backdrop.tp-active');
    const nodeArr = [...Array.from(modalNode), Array.from(backdropNode)];
    nodeArr.forEach(node => {
      const clx = node.className;
      if (clx) {
        node.parentElement.removeChild(node);
      }
      if (!clx) {
        const backdrop = document.querySelector('div.tp-backdrop.tp-active');
        backdrop.parentElement.removeChild(backdrop);
      }
    });
  }
  function makeBodyScrollable() {
    const bod = document.querySelector('body');
    bod.style.overflow = 'auto';
    bod.classList.remove('tp-modal-open');
  }

  timer = window.setInterval(() => {
    console.log('Adblock blocker blocker is running...');
    const backdrop = document.querySelectorAll('div.tp-backdrop.tp-active');
    if (backdrop.length > 0) {
      deleteModalNodes();
      makeBodyScrollable();
    } else {
      window.clearTimeout(timer);
      console.log('Adblock block blocking finished!');
    }
  }, 3000);
})();
