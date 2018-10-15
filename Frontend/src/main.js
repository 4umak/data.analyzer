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