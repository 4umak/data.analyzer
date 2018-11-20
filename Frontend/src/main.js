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
        
        $node.find('.delete').click(function () {
            API.deleteGoods(item, function (err, res) {
                if (!err && res) {
                    $node.remove();
                }
            })
        });
        $node.find('.edit').click(function () {
            var html_code2 = Templates.editItem({item: item});
            var $node2 = $(html_code2);
            $node.replaceWith($node2);

            $node2.find('.save').click(function () {
                var id = item.id;
                var articul = $('#c_articul').val();
                var name = $('#c_name').val();
                var brand = $('#c_brand').val();
                var price = $('#c_price').val();
                if(validator(id, articul, name, brand, price)) {
                    var edit = {
                        id: id,
                        articul: articul,
                        name: name,
                        brand: brand,
                        price: price
                    };
                    API.editGoods(edit, function (err, res) {
                        if(!err) {
                            document.location.href = '/';
                        }
                    })
                } else {
                    alert('Перевірте коректність даних!');
                }
            });
        });
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
    var oFile = oEvent.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        wb.SheetNames.forEach(function (sheetName) {
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            $('#accept').click(function () {
                oJS.forEach(function (one) {
                    API.writeGoods(one, function (err, res) {
                        if (!err) {
                            if(res.newItem) {
                                addLast(one);
                            }
                        }
                    })
                })
            });
        });
    };
    reader.readAsBinaryString(oFile);
}