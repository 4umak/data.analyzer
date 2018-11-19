var API = require('./API');
var Templates = require('./Templates');
var Storage = require('./LocalStorage');
var $container = $('#products');
var $competitors = $('#competitors');
var $name = $('#name');

$(function () {
    readExcel();
    showCompetitors();
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

function addLast(one) {
    var html_code = Templates.competitorName({competitor: one});
    var $node = $(html_code);

    $node.find('.competitor-name').click(function () {
        var name = this.id;
        Storage.set('name', name);
        document.location.href = '/competitor.html'
    });
    $competitors.append($node);
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
                    var urls = [];
                    for (var i = 0; i < oJS.length; i++) {
                        for(var k in oJS[i]) {
                            console.log(oJS[i]);
                            if (k === name) {
                                var a = oJS[i];
                                var url = a[k];
                            }
                            if (k === 'Articul') {
                                var b = oJS[i];
                                var articul = b[k];
                            }
                        }
                        var obj = {
                            url: url,
                            articul: articul
                        };
                        urls.push(obj);
                    }
                    var item = {
                        name: name,
                        urls: urls
                    };
                    if (urls.length === 0) {
                        alert('Такого конкурента не знайдено в таблиці!')
                    } else {
                        API.parseUrls(item, function (err, res) {
                            if (!err) {
                                var one;
                                if (res.success) {
                                    alert('Посилання на конкурента ' + item.name + ' створено!');
                                    $name.val('');
                                    $('#input-excel').val('');
                                    one = {
                                        name: name
                                    };
                                    addLast(one);
                                }
                                if (res.added) {
                                    alert('Посилання до існуючого конкурента ' + item.name + ' добавлені!');
                                    $name.val('');
                                    $('#input-excel').val('');
                                    one = {
                                        name: name
                                    };
                                    addLast(one);
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