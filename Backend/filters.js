
function filterByPrice(name, comparator, dataset, goods) {
    let data1 = getByName(name, dataset);
    let data2 = getByName(name, goods)[0];
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
        if (dataset[i].name === name)
            data.push(dataset[i]);
    }
    return data;
}

const dataset = [{name: "aga", price: 11}, {name: "aga", price: 12}, {name: "agu", price: 15}];
const detaset2 = [{name: "aga", price: 14}, {name: "age", price: 22}, {name: "agu", price: 14}];
console.log(filterByPrice("aga", ">", dataset, detaset2));
