function filterByPrice(item_name, comparator, dataset, goods) {
    let data1 = getByName(item_name, dataset);
    let data2 = getByName(item_name, goods)[0];
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
        case ">" :
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

function getByName(name, dataset) {
    let data = [];
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].item_name === name)
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

function filterByProduct(item_name, datset) {
    return getByName(item_name, dataset);
}

function filterByPeriod(item_name, date1, date2, dataset) {
    let data = [];
    let goods = getByName(item_name, dataset);
    //console.log(goods);
    for (let i =0; i< goods.length;i++) {
        //console.log(goods[i]);
       if (Date.parse(goods[i].time) > date1 && Date.parse(goods[i].time) < date2)
            data.push(goods[i]);
    }
    return data;
}

let dataset = [{item_name: "aga", price: 11, name: "techno", time: "2018-09-25T12:00:00Z"},
    {item_name: "aga", price: 12, name: "mobilluck", time: "2018-11-18T12:00:00Z"},
    {item_name: "aga", price: 12, name: "mobilluck", time: "2018-11-15T12:00:00Z"},
    {item_name: "agu", price: 15, name: "olops", time: "2015-03-25T12:00:00Z"}];
let dataset2 = [{item_name: "aga", price: 14}, {item_name: "age", price: 22}, {item_name: "agu", price: 14}];
console.log(filterByPeriod("aga",Date.parse("2018-08-10"),Date.now(),dataset));
