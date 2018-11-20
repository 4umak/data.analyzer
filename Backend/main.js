var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    app.get('/api/getGoods/', api.showGoods);
    app.get('/api/getCompetitors/', api.showCompetitors);
    app.get('/api/takeParsed/', api.takeParsed);

    app.post('/api/writeGoods/', api.writeGoods);
    app.post('/api/getUrls/', api.getUrls);
    app.post('/api/parseTechno/', api.parseTechno);
    app.post('/api/parseMobilluck/', api.parseMobilluck);
    app.post('/api/parseNobu/', api.parseNobu);
    app.post('/api/parseOfficeman/', api.parseOfficeman);
    app.post('/api/parseUrls/', api.writeCompetitors);
    app.post('/api/searchByPrice/',api.searchByPrice);
    app.post('/api/searchByPrice/', api.searchByCompetitor);
    app.post('/api/searchByPeriod/', api.searchByPeriod);

    app.get('/', pages.mainPage);
    app.get('/parsed.html', pages.parsedPage);
    app.get('/competitor.html', pages.competitor);
    app.get('/filter.html', pages.filter);
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    configureEndpoints(app);

    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/')
    });
}

exports.startServer = startServer;