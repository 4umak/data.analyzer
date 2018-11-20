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

exports.showCompetitors = function (req, res) {
    UrlsCompetitors.find(function (err, result) {
        if (err) throw err;
        res.send(result);
    })
};

exports.takeParsed = function (req, res) {
  Parsed.find(function (err, result) {
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
    var articul = req.body.articul;
    osmosis
        .get(url)
        .set({'name':'h1', 'price': '#price'})
        .data(function (data) {
            var price;
            if(typeof data.price === "undefined")
                price = "Немає в наявності";
            else
                price = data.price;
            var current = new Date();
            var day = current.getDate();
            var month = current.getMonth() + 1;
            var year = current.getFullYear();
            var hour = current.getHours();
            var minute = current.getMinutes();
            var second = current.getSeconds();
            var date = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
            var techno = new Parsed({
                name: 'techno',
                item_name: data.name,
                price: price,
                time: date,
                url: url,
                articul: articul
            });
            techno.save(function(err){
                if(!err) {
                    console.log('success saved');
                    res.send({next:true});
                }
            });
        })
};

exports.parseNobu = function(req,res){
    var url = req.body.url;
    var articul = req.body.articul;
    osmosis
        .get(url)
        .set({'name':'#pagetitle','price':'.price'})
        .data(function (data) {
            var price;
            if(typeof data.price === "undefined")
                price = "Немає в наявності";
            else
                price = data.price;
            var current = new Date();
            var day = current.getDate();
            var month = current.getMonth() + 1;
            var year = current.getFullYear();
            var hour = current.getHours();
            var minute = current.getMinutes();
            var second = current.getSeconds();
            var date = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
            var nobu = new Parsed({
                name: 'nobu',
                item_name: data.name,
                price: price,
                time: date,
                url: url,
                articul: articul
            });
            nobu.save(function(err){
                if(!err) {
                    console.log('success saved');
                    res.send({next:true});
                }
            });
        })
};

exports.parseOfficeman = function(req,res){
    var url = req.body.url;
    var articul = req.body.articul;
    osmosis
        .get(url)
        .set({'name':'h1','price':'.main'})
        .data(function (data) {
            var price;
            if(typeof data.price === "undefined")
                price = "Немає в наявності";
            else
                price = data.price;
            var current = new Date();
            var day = current.getDate();
            var month = current.getMonth() + 1;
            var year = current.getFullYear();
            var hour = current.getHours();
            var minute = current.getMinutes();
            var second = current.getSeconds();
            var date = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
            var officeman = new Parsed({
                name: 'officeman',
                item_name: data.name,
                price: price,
                time: date,
                url: url,
                articul: articul
            });
            officeman.save(function(err){
                if(!err) {
                    console.log('success saved');
                    res.send({next:true});
                }
            });
        })
};

exports.parseMobilluck = function(req,res){
    var url = req.body.url;
    var articul = req.body.articul;
    osmosis
        .get(url)
        .set({'name':'.mgood_title','price':'.price'})
        .data(function (data) {
            var price;
            if(typeof data.price === "undefined")
                price = "Немає в наявності";
            else
                price = data.price.toString() + " грн";
            var current = new Date();
            var day = current.getDate();
            var month = current.getMonth() + 1;
            var year = current.getFullYear();
            var hour = current.getHours();
            var minute = current.getMinutes();
            var second = current.getSeconds();
            var date = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';
            var mobilluck = new Parsed({
                name: 'mobilluck',
                item_name: data.name,
                price: price,
                time: date,
                url: url,
                articul: articul
            });
            mobilluck.save(function(err){
                if(!err) {
                    console.log('success saved');
                    res.send({next:true});
                }
            });
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
                    if (a.indexOf(urls[i]) === -1) a.push(urls[i]);
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
                res.send({added: true});
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

exports.deleteGoods = function (req, res) {
    var id = req.body.id;

    var query = {id: id};

    Goods.deleteOne(query, function (error, result) {
       if (error) throw error;
       res.send(true);
    });
};

exports.editGoods = function (req, res) {
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
          if(item) {
              Goods.update(
                  {
                      id: id
                  },
                  {
                      articul: articul,
                      name: name,
                      brand: brand,
                      price: price
                  },
                  function () {}
              );
              var one = {
                  id: id,
                  articul: articul,
                  name: name,
                  brand: brand,
                  price: price
              };
              res.send(one);
          }
      });
};