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
},{}],2:[function(require,module,exports){
var API = require('./API');
var $name = $('#name');

$(function () {
    readExcel();
});

function readExcel() {
    var oFileIn = document.getElementById('input-excel');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
}

function filePicked(oEvent) {
    var oFile = oEvent.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        wb.SheetNames.forEach(function (sheetName) {
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            $('#accept').click(function () {
                var name = $name.val();
                if (name !== "") {
                    var arr = [];
                    for (var i = 0; i < oJS.length; i++) {
                        for(var k in oJS[i]) {
                            if (k === name) {
                                var a = oJS[i];
                                arr.push(a[k]);
                            }
                        }
                    }
                    var item = {
                        name: name,
                        urls: arr
                    };
                    if (arr.length === 0) {
                        alert('Такого конкурента не знайдено в таблиці!')
                    } else {
                        API.parseUrls(item, function (err, res) {
                            if (!err) {
                                if (res.success) {
                                    alert("Посилання на конкурента " + item.name + " створено!");
                                    $name.val('');
                                    $('#input-excel').val('');
                                }
                            }
                        });
                    }
                } else {
                    alert('Введіть конкурента.');
                }
            });
        });
    };
    reader.readAsBinaryString(oFile);
}
},{"./API":1}]},{},[2]);
