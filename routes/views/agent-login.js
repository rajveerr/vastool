var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

  view.on('init', function(next) {
    var agentId = req.query.id;
    if (agentId == 42) {
			next();
    } else {
			res.status(401);
      res.render('errors/401');
    }
  });

	view.render('agent-home');
};
