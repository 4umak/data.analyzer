var API = require('./API');
$(function () {
    $('#searchByPrice').click(function () {
        searchByPrice();
    });
    $('#searchByCompetitor').click(function () {
        searchByCompetitor();
    });
    $('#searchByPeriod').click(function () {
        searchByPeriod();
    });
});

function searchByPrice() {
    var articul1 = $('#name1_input').val();
    var comparator = $('#pc_input').val();
    console.log("in Filters " + articul1 + "  " + comparator);
    API.searchByPrice(articul1,comparator);
}

function searchByCompetitor() {
    var name = $('#name2_input').val();
    API.searchByCompetitor(name);
}

function searchByPeriod(){
    var articul3 = $('#name3_input').val();
    var date1 = $('#date1_input').val();
    var date2 = $('#date2_input').val();
    API.searchByPeriod(articul3, date1, date2);
}