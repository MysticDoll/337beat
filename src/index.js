"use strict";
var touchFrag = false, ttsQueue = [],
    orig = Array.prototype,
    date = require("./date"),
    check = require("./check"),
    renderer = require("./renderer"),
    drum = document.getElementById("drum_icon");
ttsQueue.push = function() {
  orig.push.apply(this, arguments);
  if(this.length > 13) {
    this.shift();
    check(this, renderer);
  } else if(this.length === 13) {
    check(this, renderer);
  }
};

drum.addEventListener("touchstart", function() {
  ttsQueue.push(date.now);
  touchFrag = true;
});

drum.addEventListener("click", function() {
  touchFrag ? touchFrag = false : ttsQueue.push(date.now);
});

window.addEventListener("keydown", function() {
  ttsQueue.push(date.now);
});
