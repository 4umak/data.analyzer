exports.mainPage = function (req, res) {
    res.render('mainPage', {
        pageTitle: 'Data Analyzer',
        less: 'main',
        js: 'main'
    })
};

exports.parsedPage = function (req, res) {
  res.render('parsedPage', {
      pageTitle: 'Data Analyzer',
      less: 'parsed',
      js: 'parsed'
  })
};

exports.competitor = function (req,res) {
    res.render('competitor',{
        pageTitle: 'Data Analyzer',
        less: 'competitors',
        js: 'competitor'
    })
};

exports.filter = function (req, res) {
    res.render('filter', {
        pageTitle: 'Data Analyzer',
        less: 'filter',
        js: 'filters'
    })
};