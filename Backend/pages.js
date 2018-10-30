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

exports.parsedUrls = function (req, res) {
  res.render('parsedUrls', {
      pageTitle: 'Data Analyzer',
      less: 'urls',
      js: 'urls'
  })
};