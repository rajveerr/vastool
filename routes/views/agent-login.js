var keystone = require('keystone'),
					 _ = require('underscore');

exports = module.exports = function (req, res) {

	var WHITELISTED_AGENTS = [{
		id: '5030167',
		firstName: 'Shirley'
	}, {
		id: '7403455',
		firstName: 'Rajveer'
	}, {
		id: '3664093',
		firstName: 'Babs'
	}, {
		id: '9540002',
		firstName: 'Alex'
	}, {
		id: '3134178',
		firstName: 'Stefania'
	}];

	var view = new keystone.View(req, res);

	function findAgentBy(id) {
		return _.findWhere(WHITELISTED_AGENTS, { "id": id });
	}

  view.on('init', function(next) {
		var agent = findAgentBy(req.query.id);
    if (agent) {
			next();
    } else {
			res.status(401);
      res.render('errors/401');
    }
  });

	view.render('agent-home');
};
