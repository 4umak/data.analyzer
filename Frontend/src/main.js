// var parse = require('./parserExcel.js');
var API = require('./API');
var Templates = require('./Templates');

var $products = $('#products');
var $id = $('#id');
var $articul = $('#articul');
var $name = $('#name');
var $brand = $('#brand');
var $price = $('#price');

$(function () {
    initialiseGoods();
    readExcel();
    $('#see-products').click(function () {
        $('.products-table-container').toggle();
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
                    $id.val('');
                    $articul.val('');
                    $name.val('');
                    $brand.val('');
                    $price.val('');
                    if (res.isExist) alert('Такий товар вже є');
                    if (res.newItem) addLast(item);
                }
            })
        }else {
            alert('Перевірте коректність даних!');
        }
    });
});

function validator(id, articul, name, brand, price) {
    var valid = true;
    if (id.length === 0 || isNaN(id)) valid = false;
    if (articul.length === 0 || isNaN(articul)) valid = false;
    if (name.length === 0) valid = false;
    if (brand.length === 0) valid = false;
    if (price.length === 0 || isNaN(price) || price.toString().indexOf('.') != -1) valid = false;
    return valid;
}

function showGoods(list) {

    function showOneItem(item) {
        var html_code = Templates.oneItem({item: item});
        var $node = $(html_code);
        $products.append($node);
    }

    list.forEach(showOneItem);
}

function initialiseGoods() {
    API.showGoods(function (err, res) {
        if(!err) {
            showGoods(res);
        }
    })
}

function addLast(item) {
    var html_code = Templates.oneItem({item: item});
    var $node = $(html_code);
    $products.append($node);
}

function readExcel() {
    var oFileIn = document.getElementById('input-excel');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
}

function filePicked(oEvent) {
    // Get The File From The Input
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();

    // Ready The Event For When A File Gets Selected
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function (sheetName) {
            // Obtain The Current Row As CSV
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

            $('#accept').click(function () {
                oJS.forEach(function (one) {
                    API.writeGoods(one, function (err, res) {
                        if (!err) {
                            if(res.isExist || res.newItem) {
                                addLast(one);
                            }
                        }
                    })
                })
            });
        });
    };

    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}