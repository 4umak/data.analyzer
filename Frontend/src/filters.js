var API = require('./API');
var Storage = require('./LocalStorage');

$(function () {
    $('#searchByPrice').click(function () {
        var articul = $('#name1_input').val();
        var comparator = $('#pc_input').val();
        if(articul!=="" && comparator!=="") {
            searchByPrice(articul, comparator);
        }else
            alert("Поля мають бути заповнені!");
    });
    $('#searchByCompetitor').click(function () {
        var name = $('#name2_input').val();
        if(name!=="") {
            searchByCompetitor(name);
        }else
            alert("Поля мають бути заповнені!");
    });
    $('#searchByPeriod').click(function () {
        var articul3 = $('#name3_input').val();
        var date1 = $('#date1_input').val();
        var date2 = $('#date2_input').val();
        if(date1!==""&&date2!==""&&articul3!=="") {
            searchByPeriod(articul3, date1, date2);
        }else
            alert("Поля мають бути заповнені!");
    });
    $('#searchByBrand').click(function () {
        var brand = $('#brand_input').val();
        if(brand!=="") {
            searchByBrand(brand);
        }else
            alert("Поля мають бути заповнені!");
    });
});

function searchByBrand(brand){
    API.showGoods(function (error,result) {
        if(!error){
            API.takeParsed(function (err,res) {
                if(!err){
                    var results = filterByBrand(brand,result,res);
                    Storage.set('searchByBrand', results);
                    Storage.set('type', 'brand');
                    document.location.href = '/showByBrand.html';
                }
            })
        }
    })
}

function searchByPrice(articul,comparator) {
    API.showGoods(function (error, result) {
        if (!error) {
            API.takeParsed(function (err, res) {
                if (!err) {
                    var results = filterByPrice(articul, comparator, res, result);
                    console.log(results);
                    Storage.set('searchByPrice', results);
                    Storage.set('type', 'price');
                    document.location.href = '/showByPrice.html';
                }
            });
        }
    });
}

function searchByCompetitor(name) {
    API.takeParsed(function (err, res) {
       if (!err) {
           var results = filterByCompetitor(name, res);
           Storage.set('searchByCompetitor', results);
           Storage.set('type', 'competitor');
           document.location.href = '/showByCompetitor.html';
       }
    });
}

function searchByPeriod(articul3,date1,date2){
    API.takeParsed(function (err, res) {
        if(!err) {
            var results = filterByPeriod(articul3, date1, date2, res);
            Storage.set('searchByPeriod', results);
            Storage.set('type', 'period');
            document.location.href = '/showByPeriod.html';
        }
    });
}

function filterByBrand(brand,goods,parsed) {
    let data = [];
    for (var i = 0; i < goods.length;i++){
        if(brand === goods[i].brand)
            data.push(goods[i].articul);
    }
    let result = [];
    for(var k =0; k< data.length;k++) {
        for (var j = 0; j < parsed.length; j++)
            if (data[k] === parsed[j].articul)
                result.push(parsed[j]);
    }
    return result;
}

function filterByPrice(articul, comparator, dataset, goods) {
    console.log(comparator + " ----- ");
    let data1 = getByArticul(articul, dataset);
    let data2;
    for (let i = 0; i < goods.length; i++) {
        if (goods[i].articul === articul)
            data2 = goods[i];
    }
    let data = [];
    for (let i = 0; i < data1.length; i++) {
        if(compare(data1[i].price, comparator, data2.price)){
       // if (data1[i].price > data2.price){
            let product = {
                articul: articul,
                name: data2.name,
                price: data2.price,
                comp_name: data1[i].name,
                comp_price: data1[i].price,
                date: data1[i].time,
                link: data1[i].url
            };
            data.push(product);
        }
    }
    return data;
}

function compare(a, comparator, b) {
    console.log(a + "  " + b + "  " + comparator);
    switch (comparator) {
        case "less" :
            return a < b;
            break;
        case "more" :
            return a > b;
            break;
        case "moreEqual":
            return a >= b;
            break;
        case "lessEqual":
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
    console.log(data);
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

function filterByPeriod(articul, date1, date2, dataset) {
    let data = [];
    let goods = getByArticul(articul, dataset);
    console.log(goods);
    for (let i =0; i< goods.length;i++) {
        if (Date.parse(goods[i].time) > date1 && Date.parse(goods[i].time) < date2)
            console.log(good[i]);
            data.push(goods[i]);
    }
    return data;
}