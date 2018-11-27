var Templates = require('./Templates');
var Storage = require('./LocalStorage');
var $products = $('#products');

$(function () {
    var type = Storage.get('type');
    var results;
    var html_code;
    var $node;
    var i;
    if (type === 'price') {
        results = Storage.get('searchByPrice');
        for (i = 0; i < results.length; i++) {
            html_code = Templates.priceFilter({item: results[i]});
            $node = $(html_code);
            $products.append($node);
        }
    }

    if (type === 'brand') {
        results = Storage.get('searchByBrand');
        for (i = 0; i < results.length; i++) {
            html_code = Templates.brandFilter({item: results[i]});
            $node = $(html_code);
            $products.append($node);
        }
    }

    if (type === 'competitor') {
        results = Storage.get('searchByCompetitor');
        for (i = 0; i < results.length; i++) {
            html_code = Templates.competitorFilter({item: results[i]});
            $node = $(html_code);
            $products.append($node);
        }
    }

    if (type === 'period') {
        results = Storage.get('searchByPeriod');
        for (i = 0; i < results.length; i++) {
            html_code = Templates.brandFilter({item: results[i]});
            $node = $(html_code);
            $products.append($node);
        }
    }
});