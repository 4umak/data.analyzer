exports.filterByPrice = function(articul, comparator, dataset, goods) {
    let data1 = getByArticul(articul, dataset);
    let data2 = getByArticul(articul, goods)[0];
    let data = [];
    for (let i = 0; i < data1.length; i++)
        if (compare(data1[i].price, comparator, data2.price))
            data.push(data1[i]);
    return data;
};

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

exports.filterByCompetitor = function(brand, dataset) {
    let data = [];
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].name === brand)
            data.push(dataset[i]);
    }
    return data;
};

exports.filterByProduct = function(articul, datset) {
    return getByArticul(articul, dataset);
};

exports.filterByPeriod = function(articul, date1, date2, dataset) {
    let data = [];
    let goods = getByArticul(articul, dataset);
    for (let i =0; i< goods.length;i++) {
       if (Date.parse(goods[i].time) > date1 && Date.parse(goods[i].time) < date2)
            data.push(goods[i]);
    }
    return data;
};

/*let dataset = [{articul: "aga", price: 11, name: "techno", time: "2018-09-25T12:00:00Z"},
    {articul: "aga", price: 12, name: "mobilluck", time: "2018-11-18T12:00:00Z"},
    {articul: "aga", price: 12, name: "mobilluck", time: "2018-11-15T12:00:00Z"},
    {articul: "agu", price: 15, name: "olops", time: "2015-03-25T12:00:00Z"}];
let dataset2 = [{articul: "aga", price: 14},
    {articul: "age", price: 22},
    {articul: "agu", price: 14}];
console.log(filterByPeriod("aga",Date.parse("2018-08-10"),Date.now(),dataset));*/
