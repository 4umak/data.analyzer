var API = require('./API');
$(function () {
    var articul2 = $('#name2_input').val();
    var articul3 = $('#name3_input').val();
    var date1 = $('#date1_input').val();
    var date2 = $('#date2_input').val();
    $('#searchByPrice').click(function () {
        searchByPrice();
    });
});

function searchByPrice() {
    var articul1 = $('#name1_input').val();
    var comparator = $('#pc_input').val();
    console.log("in Filters " + articul1 + "  " + comparator);
    API.searchByPrice(articul1,comparator);
}