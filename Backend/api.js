var db = require('./database.js');
var osmosis = require('osmosis');
var Goods = db.Goods;
var Parsed = db.Parsed;
var UrlsCompetitors = db.UrlsCompetitors;

exports.writeGoods = function (req, res) {
  var id = req.body.id;
  var articul = req.body.articul;
  var name = req.body.name;
  var brand = req.body.brand;
  var price = req.body.price;

  Goods.findOne(
      {
          id: id
      },
      function (err, item) {
          if (item) {
              res.send({
                  isExist: true
              });
          } else {
              var one_item = new Goods({
                  id: id,
                  articul: articul,
                  name: name,
                  brand: brand,
                  price: price
              });

              one_item.save(function (err) {
                  if (!err) {
                      res.send({
                          newItem: true
                      });
                  }
              });
          }
      }
  )
};

exports.showGoods = function (req, res) {
    Goods.find(function (err, result) {
        if (err) throw err;
        res.send(result);
    })
};

exports.getUrls = function (req, res) {
    var name = req.body.name;
    UrlsCompetitors.findOne(
        {
            name: name
        },
        function (err, data) {
            if (data) {
                res.send({empty: false, urls: data.urls});
            } else {
                res.send({empty:true});
            }
        }
    );
};

exports.parseTechno = function (req, res) {
    var url = req.body.url;
    osmosis
        .get(url)
        .set({'name':'h1', 'price': '#price'})
        .data(function (data) {
            var obj = {
                competitor: "A-Texно",
                name: data.name,
            };
            if(typeof data.price === "undefined")
                obj.price = "Немає в наявності";
            else
                obj.price = data.price;
            res.send(obj);
        })
};

exports.writeCompetitors = function (req, res) {
    var name = req.body.name;
    var urls = req.body.urls;

    UrlsCompetitors.findOne(
        {
            name: name
        },
        function (err, competitor) {
            if (competitor) {
                var a = competitor.urls;
                for (var i = 0; i < urls.length; i++) {
                    a.push(urls[i]);
                }
                UrlsCompetitors.update(
                    {
                       name: name
                    },
                    {
                        urls: a
                    },
                    function () {}
                );
                res.send({success: true});
            } else {
                var one_competitor = new UrlsCompetitors({
                    name: name,
                    urls: urls
                });
                one_competitor.save(function (err) {
                    if (!err) {
                        res.send({success: true})
                    }
                })
            }
        }
    )
};

exports.parseNobu = function(req,res){
    var url = req.body.url;
    osmosis
        .get(url)
        .set({'name':'#pagetitle','price':'.price'})
        .data(function (data) {
            var obj = {
                competitor : "Nobu",
                name : data.name,
            };
            if(typeof data.price === "undefined")
                obj.price = "Немає в наявності";
            else
                obj.price = data.price;
            res.send(obj);
        })
};

exports.parseOfficeman = function(req,res){
    var url = req.body.url;
    osmosis
        .get(url)
        .set({'name':'h1','price':'.main'})
        .data(function (data) {
            var obj = {
                competitor : "Officeman",
                name : data.name,
            };
            if(typeof data.price === "undefined")
                obj.price = "Немає в наявності";
            else
                obj.price = data.price;
            res.send(obj);
        })
};

exports.parseMobilluck = function(req,res){
    var url = req.body.url;
    osmosis
        .get(url)
        .set({'name':'.mgood_title','price':'.price'})
        .data(function (data) {
            var obj = {
                competitor : "Mobilluck",
                name : data.name,
            };
            if(typeof data.price === "undefined")
                obj.price = "Немає в наявності";
            else
                obj.price = data.price;
            console.log(obj);
        })
};
