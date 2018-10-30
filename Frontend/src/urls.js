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