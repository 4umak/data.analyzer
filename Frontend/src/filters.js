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
    var articul = $('#name1_input').val();
    var comparator = $('#pc_input').val();
    API.showGoods(function (error, result) {
        if (!error) {
            API.takeParsed(function (err, res) {
                if (!err) var results = filterByPrice(articul, comparator, res, result);
            });
        }
    });
}

function searchByCompetitor() {
    var name = $('#name2_input').val();
    API.takeParsed(function (err, res) {
       if (!err) var results = filterByCompetitor(name, res);
    });
}

function searchByPeriod(){
    var articul3 = $('#name3_input').val();
    var date1 = $('#date1_input').val();
    var date2 = $('#date2_input').val();
    API.takeParsed(function (err, res) {
        if(!err) var results = filterByPeriod(articul3, date1, date2, res);
    });
}



function filterByPrice(articul, comparator, dataset, goods) {
    let data1 = getByArticul(articul, dataset);
    let data2 = getByArticul(articul, goods)[0];
    let data = [];
    for (let i = 0; i < data1.length; i++)
        if (compare(data1[i].price, comparator, data2.price))
            data.push(data1[i]);
    return data;
}

function compare(a, comparator, b) {
    switch (comparator) {
        case "<" :
            return a < b;
            break;
        case "more", ">" :
            return a > b;
            break;
        case ">=":
            return a >= b;
            break;
        case "<=":
            return a <= b;
            break;
        case "===" , "==":
            return a === b;
            break;
        default :
            return false;
            break;
    }
}

function getByArticul(articul, dataset) {
    let data = [];
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].articul === articul)
            data.push(dataset[i]);
    }
    return data;
}

function filterByCompetitor(brand, dataset) {
    let data = [];
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].name === brand)
            data.push(dataset[i]);
    }
    return data;
}

function filterByProduct(articul, dataset) {
    return getByArticul(articul, dataset);
}

function filterByPeriod(articul, date1, date2, dataset) {
    let data = [];
    let goods = getByArticul(articul, dataset);
    for (let i =0; i< goods.length;i++) {
        if (Date.parse(goods[i].time) > date1 && Date.parse(goods[i].time) < date2)
            data.push(goods[i]);
    }
    return data;
}