var API_URL = "http://localhost:4040";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.showGoods = function (callback) {
    backendGet('/api/getGoods/', callback);
};

exports.showCompetitors = function(callback) {
  backendGet('/api/getCompetitors/', callback);
};

exports.takeParsed = function(callback) {
  backendGet('/api/takeParsed/', callback);
};

exports.writeGoods = function (one_item, callback) {
    backendPost('/api/writeGoods/', one_item, callback)
};

exports.getUrls = function (name, callback) {
    backendPost('/api/getUrls/', name, callback);
};

exports.parseTechno = function (url, callback) {
  backendPost('/api/parseTechno/', url, callback);
};

exports.parseUrls = function (urls, callback) {
    backendPost('/api/parseUrls/', urls, callback)
};

exports.parseMobilluck = function (url, callback) {
  backendPost('/api/parseMobilluck/', url, callback);
};

exports.parseNobu = function (url, callback) {
    backendPost('/api/parseNobu/', url, callback);
};

exports.parseOfficeman = function (url, callback) {
  backendPost('/api/parseOfficeman/', url, callback);
};

exports.searchByPrice = function (articul,comparator,callback) {
    const obj = {
        articul: articul,
        comparator: comparator
    };
    console.log("in API " + "   " + articul + "   " + comparator);
    backendPost('/api/searchByPrice/', obj, callback);
};

exports.searchByCompetitor = function (name, callback) {
    backendPost('/api/searchByCompetitor/', name, callback);
};

exports.searchByPeriod = function (articul,date1,date2, callback) {
    const obj = {
        articul: articul,
        date1: date1,
        date2: date2
    };
    backendPost('/api/searchByPeriod/', obj, callback);
};