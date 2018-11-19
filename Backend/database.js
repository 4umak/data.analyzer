var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Data-Analyze');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var one_item = new mongoose.Schema({
    id: {type: String, unique: true},
    articul: {type: String},
    name: {type: String},
    brand: {type: String},
    price: {type: String}
});

var parsed = new mongoose.Schema({
    name: {type: String},
    item_name: {type: String},
    price: {type: String},
    time: {type: String},
    articul: {type: String},
    url: {type: String}
});

var competitors = new mongoose.Schema({
    name: {type: String},
    urls: [],
});

var Goods = mongoose.model('goods', one_item);
var Parsed = mongoose.model('parsed', parsed);
var UrlsCompetitors = mongoose.model('competitors', competitors);

exports.Goods = Goods;
exports.Parsed = Parsed;
exports.UrlsCompetitors = UrlsCompetitors;