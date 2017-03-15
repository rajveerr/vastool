var keystone = require('keystone');

// master login controller

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);

  view.on('get', function(next) {
    if (req.query.from && req.query.from.includes('keystone')) {
      // admin login
      res.redirect('/keystone/signin');
    } else {
      // agent login
      view.redirect('/agent-login');
    }
  });

  view.render('/');
};
