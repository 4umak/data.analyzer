var fs = require('fs');
var ejs = require('ejs');

exports.oneItem = ejs.compile(fs.readFileSync('./Frontend/templates/oneItem.ejs', "utf8"));