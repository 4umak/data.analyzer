var API = require('./API');
var Templates = require('./Templates');
var $container = $('#products');

$(function () {
    // techno();
    // mobilluck();
    // nobu();
    officeman();
});

function showParsed(item) {
    console.log("parsed!");
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
            if (!res.empty) {
                for (var i = 0; i < res.urls.length; i++) {
                    var url = {
                        url: res.urls[i]
                    };
                    API.parseTechno(url, function (err, result) {
                        // if(err) console.log(err);
                        // console.log(result);
                        if (result !== undefined) showParsed(result);
                    });
                }
            } else {
                alert('Немає такого конкурента.');
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
            if(!res.empty) {
                for (var i = 0; i < res.urls.length; i++) {
                    var url = {
                        url: res.urls[i]
                    };
                    API.parseMobilluck(url, function (err, result) {
                        if(err) console.log(err);
                        console.log(result);
                        if (result !== undefined) showParsed(result);
                    });
                }
            } else {
                alert('Немає такого конкурента.');
            }
        }
    })
}

function nobu() {
    var name = {
        name: 'nobu'
    };
    API.getUrls(name, function (err, res) {
        if(!err) {
            if (!res.empty) {
                for (var i = 0; i < res.urls.length; i++) {
                    var url = {
                        url: res.urls[i]
                    };
                    API.parseNobu(url, function (err, result) {
                        if(err) console.log(err);
                        console.log(result);
                        if (result !== undefined) showParsed(result);
                    });
                }
            } else {
                alert('Немає такого конкурента.');
            }
        }
    })
}

function officeman() {
    var name = {
        name: 'officeman'
    };
    API.getUrls(name, function (err, res) {
        if(!err) {
            if (!res.empty) {
                for (var i = 0; i < res.urls.length; i++) {
                    var url = {
                        url: res.urls[i]
                    };
                    API.parseOfficeman(url, function (err, result) {
                        if(err) console.log(err);
                        console.log(result);
                        if (result !== undefined) showParsed(result);
                    });
                }
            } else {
                alert('Немає такого конкурента.');
            }
        }
    })
}