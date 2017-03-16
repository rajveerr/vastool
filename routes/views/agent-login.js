var keystone = require('keystone'),
					 _ = require('underscore');

exports = module.exports = function (req, res) {

	var WHITELISTED_AGENTS = [{
		id: 'PDC503',
		firstName: 'Shirley'
	}, {
		id: 'PDC740',
		firstName: 'Rajveer'
	}, {
		id: 'PDC366',
		firstName: 'Babs'
	}, {
		id: 'PDC954',
		firstName: 'Alex'
	}, {
		id: 'PDC313',
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

  view.on('post', function(next) {
		var agent = findAgentBy(req.body.id);
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

	view.render('agent-login');
};
