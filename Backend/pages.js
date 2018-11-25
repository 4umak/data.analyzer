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

exports.showFilters = function (req, res) {
  res.render('showFilters', {
      pageTitle: 'Data Analyzer',
      less: 'price',
      js: 'showFilters'
  })
};

exports.showByPrice = function (req,res) {
    res.render('showByPrice', {
        pageTitle: 'Data Analyzer',
        less: 'priceFilter',
        js: 'showByPrice'
    })
};

exports.showByCompetitor = function (req, res) {
    res.render('showByCompetitor', {
        pageTitle: 'Data Analyzer',
        less: 'competitorFilter',
        js: 'competitorFilter'
    })
};

exports.showByBrand = function (req, res) {
    res.render('showByBrand',{
        pageTitle: 'Data Analyzer',
        less: 'brandFilter',
        js: 'brandFilter'
    })
};