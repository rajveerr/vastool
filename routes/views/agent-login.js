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
	var User = keystone.list(keystone.get('user model'));

	function findAgentBy(id) {
		return _.findWhere(WHITELISTED_AGENTS, { "id": id });
	}

	function signIn(agent, success) {
		var user = new User.model({
			name: {first: agent.firstName, last: agent.firstName},
			canAccessKeystone: false
		});
		keystone.session.signinWithUser(user, req, res, success);
	}

  view.on('init', function(next) {
		var agent = findAgentBy(req.query.id);
    if (agent) {
			signIn(agent, function (user) {
				req.session.user = res.locals.user = user;
				res.render('agent-home');
			});
    } else {
			res.status(401);
      res.render('errors/401');
    }
  });

	view.render('agent-home');
};
