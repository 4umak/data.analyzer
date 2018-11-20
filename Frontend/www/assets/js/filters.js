(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var API_URL = "http://localhost:4040";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.showGoods = function (callback) {
    backendGet('/api/getGoods/', callback);
};

exports.showCompetitors = function(callback) {
  backendGet('/api/getCompetitors/', callback);
};

exports.takeParsed = function(callback) {
  backendGet('/api/takeParsed/', callback);
};

exports.writeGoods = function (one_item, callback) {
    backendPost('/api/writeGoods/', one_item, callback)
};

exports.getUrls = function (name, callback) {
    backendPost('/api/getUrls/', name, callback);
};

exports.parseTechno = function (url, callback) {
  backendPost('/api/parseTechno/', url, callback);
};

exports.parseUrls = function (urls, callback) {
    backendPost('/api/parseUrls/', urls, callback)
};

exports.parseMobilluck = function (url, callback) {
  backendPost('/api/parseMobilluck/', url, callback);
};

exports.parseNobu = function (url, callback) {
    backendPost('/api/parseNobu/', url, callback);
};

exports.parseOfficeman = function (url, callback) {
  backendPost('/api/parseOfficeman/', url, callback);
};

exports.deleteGoods = function (id, callback) {
  backendPost('/api/deleteGoods/', id, callback);
};

exports.editGoods = function (item, callback) {
    backendPost('/api/editGoods/', item, callback);
};
},{}],2:[function(require,module,exports){
var API = require('./API');
$(function () {
    $('#searchByPrice').click(function () {
        searchByPrice();
    });
    $('#searchByCompetitor').click(function () {
        searchByCompetitor();
    });
    $('#searchByPeriod').click(function () {
        searchByPeriod();
    });
});

function searchByPrice() {
    var articul = $('#name1_input').val();
    var comparator = $('#pc_input').val();
    API.showGoods(function (error, result) {
        if (!error) {
            API.takeParsed(function (err, res) {
                if (!err) var results = filterByPrice(articul, comparator, res, result);
            });
        }
    });
}

function searchByCompetitor() {
    var name = $('#name2_input').val();
    API.takeParsed(function (err, res) {
       if (!err) var results = filterByCompetitor(name, res);
    });
}

function searchByPeriod(){
    var articul3 = $('#name3_input').val();
    var date1 = $('#date1_input').val();
    var date2 = $('#date2_input').val();
    API.takeParsed(function (err, res) {
        if(!err) var results = filterByPeriod(articul3, date1, date2, res);
    });
}



function filterByPrice(articul, comparator, dataset, goods) {
    let data1 = getByArticul(articul, dataset);
    let data2 = getByArticul(articul, goods)[0];
    let data = [];
    for (let i = 0; i < data1.length; i++)
        if (compare(data1[i].price, comparator, data2.price))
            data.push(data1[i]);
    return data;
}

function compare(a, comparator, b) {
    switch (comparator) {
        case "<" :
            return a < b;
            break;
        case "more", ">" :
            return a > b;
            break;
        case ">=":
            return a >= b;
            break;
        case "<=":
            return a <= b;
            break;
        case "===" , "==":
            return a === b;
            break;
        default :
            return false;
            break;
    }
}

function getByArticul(articul, dataset) {
    let data = [];
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].articul === articul)
            data.push(dataset[i]);
    }
    return data;
}

function filterByCompetitor(brand, dataset) {
    let data = [];
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].name === brand)
            data.push(dataset[i]);
    }
    return data;
}

function filterByProduct(articul, dataset) {
    return getByArticul(articul, dataset);
}

function filterByPeriod(articul, date1, date2, dataset) {
    let data = [];
    let goods = getByArticul(articul, dataset);
    for (let i =0; i< goods.length;i++) {
        if (Date.parse(goods[i].time) > date1 && Date.parse(goods[i].time) < date2)
            data.push(goods[i]);
    }
    return data;
}
},{"./API":1}]},{},[2]);
