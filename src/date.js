var date = {};
Object.defineProperty(date, "now", {get: ()=>Date.now()});
module.exports = date;
