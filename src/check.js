var isIntervalValid = function(arr) {
  var validInterval = Math.abs(arr[0] - arr[arr.length - 1]) / 14;
  var intervals = arr.map((v, i)=>Math.abs(arr[i + 1] - v))
    .filter((v)=>!Number.isNaN(v));
  intervals[2] /= 2, intervals[5] /= 2;
  return intervals.reduce((pre, cur) => pre && Math.abs(cur - validInterval) < 30, true);
  
};
module.exports = (ttsQueue, renderer) => renderer(isIntervalValid(ttsQueue), document.querySelector("#is_tts"));
