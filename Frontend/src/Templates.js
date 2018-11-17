var fs = require('fs');
var ejs = require('ejs');

exports.oneItem = ejs.compile(fs.readFileSync('./Frontend/templates/oneItem.ejs', "utf8"));
exports.oneParsed = ejs.compile(fs.readFileSync('./Frontend/templates/oneParsed.ejs', "utf8"));
exports.competitorName = ejs.compile(fs.readFileSync('./Frontend/templates/competitorName.ejs', "utf8"));