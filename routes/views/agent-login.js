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
	var User = keystone.list('User');

	function findAgentBy(id) {
		return _.findWhere(WHITELISTED_AGENTS, { "id": id });
	}

  view.on('post', function(next) {
		var agent = findAgentBy(req.body.id);
    if (agent) {
			var agentUser = new User.model({
				name: { first: agent.firstName, last: 'X' },
        isAdmin: false
			});
			keystone.session.signinWithUser(agentUser, req, res, function(foo) {
				console.log('works!', req.user);
				req.user = foo;
				// next();
				res.render('agent-home');
			});
    } else {
			res.status(401);
      res.render('errors/401');
    }
  });

	view.on('init', function(next) {
		next();
	});

	view.render('index');
};
