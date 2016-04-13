"use strict";
var ttsQueue = [], orig = Array.prototype, date = require("./date"), check = require("./check"), renderer = require("./renderer");
ttsQueue.push = function() {
  orig.push.apply(this, arguments);
  if(this.length > 13) {
    this.shift();
    check(this, renderer);
  } else if(this.length === 13) {
    check(this, renderer);
  }
};

window.addEventListener("click", function() {
  ttsQueue.push(date.now);
});
