var API = require('./API');
var Templates = require('./Templates');
var $products;// = $('#products');
$(function () {
    $('#searchByPrice').click(function () {
        var articul = $('#name1_input').val();
        var comparator = $('#pc_input').val();
        if(articul!=="" && comparator!=="") {
            document.location.href = '/showByPrice.html';
            $products = $('#products');
            searchByPrice(articul, comparator);
        }else
            alert("Поля мають бути заповнені!");
    });
    $('#searchByCompetitor').click(function () {
        var name = $('#name2_input').val();
        if(name!=="") {
            document.location.href = '/showByCompetitor.html';
            $products = $('#products');
            searchByCompetitor(name);
        }else
            alert("Поля мають бути заповнені!");
    });
    $('#searchByPeriod').click(function () {
        var articul3 = $('#name3_input').val();
        var date1 = $('#date1_input').val();
        var date2 = $('#date2_input').val();
        if(date1!==""&&date2!==""&&articul3!=="") {
            document.location.href = '/show.html';
            $products = $('#products');
            searchByPeriod(articul3, date1, date2);
        }else
            alert("Поля мають бути заповнені!");
    });
    $('#searchByBrand').click(function () {
        var brand = $('#brand_input').val();
        if(brand!=="") {
            document.location.href = '/showByBrand.html';
            $products = $('#products');
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
                    for(var i =0; i< results.length;i++) {
                        var html_code = Templates.brandFilter({item: results[i]});
                        var $node = $(html_code);
                        $products.append($node);
                    }
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
                    for(var i =0; i< results.length;i++) {
                        var html_code = Templates.priceFilter({item: results[i]});
                        var $node = $(html_code);
                        $products.append($node);
                    }
                }
            });
        }
    });
}

function searchByCompetitor(name) {
    API.takeParsed(function (err, res) {
       if (!err) {
           var results = filterByCompetitor(name, res);
           for(var i =0; i< results.length;i++) {
               var html_code = Templates.competitorFilter({item: results[i]});
               var $node = $(html_code);
               $products.append($node);
           }
       }
    });
}

function searchByPeriod(articul3,date1,date2){
    API.takeParsed(function (err, res) {
        if(!err) {
            var results = filterByPeriod(articul3, date1, date2, res);
            for(var i =0; i< results.length;i++) {
                var html_code = Templates.brandFilter({item: results[i]});
                var $node = $(html_code);
                $products.append($node);
            }
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
    let data1 = getByArticul(articul, dataset);
    let data2 = getByArticul(articul, goods)[0];
    let data = [];
    for (let i = 0; i < data1.length; i++)
        if (compare(data1[i].price, comparator, data2.price)) {
            let product = {
                articul:articul,
                name: data2.name,
                price: data2.price,
                comp_name: data1[i].name,
                comp_price: data[i].price,
                date: data1[i].time,
                link: data1[i].url
            };
            data.push(product);
        }
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
    console.log(data);
    alert("");
    return data;
}