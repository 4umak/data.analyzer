var API = require('./API');
var Storage = require('./LocalStorage');
var Templates = require('./Templates');
var $products = $('#products');

$(function () {
    var name = Storage.get('name');
    $('#competitor_name').html(name);
    $('#parse').html('Parse ' + name);
    initialiseGoods(name);
    var competitor_name = {
        name: name
    };
    $('#parse').click(function () {
        getUrls(competitor_name);
    });
});

function showGoods(list) {

    function showOneItem(item) {
        var html_code = Templates.competitorOneGoods({item: item});
        var $node = $(html_code);
        $products.append($node);
    }

    list.forEach(showOneItem);
}

function initialiseGoods(name) {
    API.showGoods(function (err, res) {
        if(!err) {
            API.takeParsed(function (err, result) {
                var needed = [];
                var i;
                for (i = 0; i < result.length; i++) {
                    if (result[i].name === name) {
                        needed.push(result[i]);
                    }
                }
                var items = [];
                for (i = 0; i < res.length; i++) {
                    var find = false;
                    var one = {
                        name: res[i].name,
                        time: '-',
                        price: '-',
                        url: '-',
                        articul: res[i].articul
                    };
                    for (var k = 0; k < needed.length; k++) {
                        if (res[i].articul === needed[k].articul) {
                            one = {
                                name: res[i].name,
                                time: needed[k].time,
                                price: needed[k].price,
                                url: needed[k].url,
                                articul: res[i].articul
                            };
                            find = true;
                            items.push(one);
                        }
                    }
                    if (!find) {
                        items.push(one);
                    }
                }
                var array = [];
                for (i = 0; i < items.length; i++) {
                    if (!checkIfExist(array, items[i].articul)) array.push(takeMaxDate(items, items[i]));
                }
                showGoods(array);
            });
        }
    })
}

function takeMaxDate(arr, item) {
    var obj = item;
    for (var i = 0; i < arr.length; i++) {
        if (item.articul === arr[i].articul) {
            if (Date.parse(item.time) < Date.parse(arr[i].time)) {
                obj = arr[i];
            }
        }
    }
    return obj;
}

function checkIfExist(arr, articul) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].articul === articul) {
            return true;
        }
    }
    return false;
}

function getUrls(name) {
    API.getUrls(name, function (err, res) {
        if (!err) {
            if (!res.empty) {
                var urls = [];
                var articuls = [];
                for (var n = 0; n < res.urls.length; n++) {
                    for(var k in res.urls[n]) {
                        if (k === 'url') {
                            var a = res.urls[n];
                            var url = a[k];
                        }
                        if (k === 'articul') {
                            var b = res.urls[n];
                            var articul = b[k];
                        }
                    }
                    urls.push(url);
                    articuls.push(articul);
                }
                var i = 0;
                var end = res.urls.length;
                parse(urls, i, end, name.name, articuls);
            } else {
                alert('Немає такого конкурента.');
            }
        }
    });
}

function parse(urls, i, end, competitor, articuls) {
    if (i < end) {
        var url = {
            url: urls[i],
            articul: articuls[i]
        };
        i++;
        switch (competitor) {
            case 'techno':
                API.parseTechno(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor, articuls);
                        }
                    }
                });
                break;
            case 'mobilluck':
                API.parseMobilluck(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor, articuls);
                        }
                    }
                });
                break;
            case 'nobu':
                API.parseNobu(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor, articuls);
                        }
                    }
                });
                break;
            case 'officeman':
                API.parseOfficeman(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor, articuls);
                        }
                    }
                });
                break;
        }
    } else {
        alert("Parsed All!");
    }
}