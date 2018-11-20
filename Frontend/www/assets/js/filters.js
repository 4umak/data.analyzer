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

exports.searchByPrice = function (articul,comparator, callback) {
    const obj = {
        articul: articul,
        comparator: comparator
    };
    console.log("in API " + "   " + articul + "   " + comparator + "---" + obj.articul);
    backendPost('/api/searchByPrice/', obj, callback);
};
},{}],2:[function(require,module,exports){
var API = require('./API');
$(function () {
    var articul2 = $('#name2_input').val();
    var articul3 = $('#name3_input').val();
    var date1 = $('#date1_input').val();
    var date2 = $('#date2_input').val();
    $('#searchByPrice').click(function () {
        searchByPrice();
    });
});

function searchByPrice() {
    var articul1 = $('#name1_input').val();
    var comparator = $('#pc_input').val();
    console.log("in Filters " + articul1 + "  " + comparator);
    API.searchByPrice(articul1,comparator);
}
},{"./API":1}]},{},[2]);
