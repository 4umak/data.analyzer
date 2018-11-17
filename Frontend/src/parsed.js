var API = require('./API');
var Templates = require('./Templates');
var Storage = require('./LocalStorage.js');
var $container = $('#products');
var $competitors = $('#competitors');
var $name = $('#name');

$(function () {
    readExcel();
    showCompetitors();
    var competitor_name = {
        name: 'techno'
    };
    // getUrls(competitor_name)
});

function showParsed(item) {
    //var html_code = Templates.oneParsed({item: item});
    //var $node = $(html_code);
   // $container.append($node);
}

function showCompetitors() {
    API.showCompetitors(function (err, res) {
        if (!err) {
            res.forEach(function (one) {
               var html_code = Templates.competitorName({competitor: one});
               var $node = $(html_code);

               $node.find('.competitor-name').click(function () {
                   var name = this.id;
                   Storage.set('name', name);
                   document.location.href = '/competitor.html'
               });

               $competitors.append($node);
            });
        }
    })
}

function parse(urls, i, end, competitor) {
    if (i < end) {
        var url = {
            url: urls[i]
        };
        console.log(competitor);
        switch (competitor) {
            case 'techno':
                API.parseTechno(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor);
                        }
                    }
                });
                break;
            case 'mobilluck':
                API.parseMobilluck(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor);
                        }
                    }
                });
                break;
            case 'nobu':
                API.parseNobu(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor);
                        }
                    }
                });
                break;
            case 'officeman':
                API.parseOfficeman(url, function (err, res) {
                    if (!err) {
                        if (res.next) {
                            parse(urls, i++, end, competitor);
                        }
                    }
                });
                break;
        }
    } else {
        alert("Parsed All!");
    }
}

function getUrls(name) {
    API.getUrls(name, function (err, res) {
        if (!err) {
            if (!res.empty) {
                var i = 0;
                var end = res.urls.length;
                parse(res.urls, i, end, name.name);
            } else {
                alert('Немає такого конкурента.');
            }
        }
    });
}

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
                                    alert('Посилання на конкурента ' + item.name + ' створено!');
                                    $name.val('');
                                    $('#input-excel').val('');
                                }
                                if (res.added) {
                                    alert('Посилання до існуючого конкурента ' + item.name + ' добавлені!');
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