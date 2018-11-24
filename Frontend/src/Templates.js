var fs = require('fs');
var ejs = require('ejs');

exports.oneItem = ejs.compile(fs.readFileSync('./Frontend/templates/oneItem.ejs', "utf8"));
exports.oneParsed = ejs.compile(fs.readFileSync('./Frontend/templates/oneParsed.ejs', "utf8"));
exports.competitorName = ejs.compile(fs.readFileSync('./Frontend/templates/competitorName.ejs', "utf8"));
exports.competitorOneGoods = ejs.compile(fs.readFileSync('./Frontend/templates/competitorOneGoods.ejs', "utf8"));
exports.editItem = ejs.compile(fs.readFileSync('./Frontend/templates/editItem.ejs', "utf8"));
exports.priceFilter = ejs.compile(fs.readFileSync('./Frontend/templates/priceFilterItem.ejs','utf8'));
exports.competitorFilter = ejs.compile(fs.readFileSync('./Frontend/templates/competitorFilter.ejs','utf8'));
