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

exports.writeGoods = function (one_item, callback) {
    backendPost('/api/writeGoods/', one_item, callback)
};

exports.showGoods = function (callback) {
    backendGet('/api/getGoods/', callback);
};
},{}],2:[function(require,module,exports){
// var parse = require('./parserExcel.js');
var API = require('./API.js');

var $id = $('#id');
var $articul = $('#articul');
var $name = $('#name');
var $brand = $('#brand');
var $price = $('#price');

$(function () {
    API.showGoods(function (err, res) {
       if (!err) {
           console.log(res);
       }
    });
    $('#see-products').click(function () {
        $('.products-table-container').hide();
    });
    $('.add-to-db').click(function () {
        var id = $id.val();
        var articul = $articul.val();
        var name = $name.val();
        var brand = $brand.val();
        var price = $price.val();
        if (validator(id, articul, name, brand, price)) {
            var item = {
                id: id,
                articul: articul,
                name: name,
                brand: brand,
                price: price
            };
            API.writeGoods(item, function (err, res) {
                if (!err) {
                    if (res.isExist) alert('Такий товар вже є');
                    if (res.newItem) alert('Товар успішно добавлений');
                }
            })
        }
    });
});

function validator(id, articul, name, brand, price) {
    var valid = true;
    if (id.length === 0) valid = false;
    if (articul.length === 0) valid = false;
    if (name.length === 0) valid = false;
    if (brand.length === 0) valid = false;
    if (price.length === 0) valid = false;
    return valid;
}
},{"./API.js":1}]},{},[2]);
