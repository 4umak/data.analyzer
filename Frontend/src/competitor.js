var Storage = require('./LocalStorage');

$(function () {
    var name = Storage.get('name');
    $('#competitor_name').html(name);
    showGoods();
});

function showGoods() {
    
}