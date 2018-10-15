var db = require('./database.js');
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