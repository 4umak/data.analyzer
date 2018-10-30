var API = require('./API');
var Templates = require('./Templates');
var $container = $('#products');

$(function () {
    
});

function showParsed(item) {
    var html_code = Templates.oneParsed({item: item});
    var $node = $(html_code);
    $container.append($node);
}

function techno() {
    var name = {
        name: 'techno'
    };
    API.getUrls(name, function (err, res) {
        if (!err) {
            for (var i = 0; i < res.urls.length; i++) {
                var url = {
                    url: res.urls[i]
                };
                API.parseTechno(url, function (err, result) {
                    if(err) console.log(err);
                    console.log(result);
                    showParsed(result);
                });
            }
        }
    });
}

function mobilluck() {
    var name = {
        name: 'mobilluck'
    };
    API.getUrls(name, function (err, res) {
        if(!err) {
            for (var i = 0; i < res.urls.length; i++) {
                var url = {
                    url: res.urls[i]
                };
                // API.parseTechno(url, function (err, result) {
                //     if(err) console.log(err);
                //     console.log(result);
                //     showParsed(result);
                // });
            }
        }
    })
}