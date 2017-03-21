var keystone = require('keystone'),
	_ = require('underscore');

exports = module.exports = function(req, res) {

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

	var WHITELISTED_EMPLOYERS = [{
		id: 'EMP503',
		firstName: 'Employer by Shirley'
	}, {
		id: 'EMP740',
		firstName: 'Employer by Rajveer'
	}, {
		id: 'EMP366',
		firstName: 'Employer by Babs'
	}, {
		id: 'EMP954',
		firstName: 'Employer by Alex'
	}, {
		id: 'EMP313',
		firstName: 'Employer by Stefania'
	}];

	var view = new keystone.View(req, res);
	var User = keystone.list(keystone.get('user model'));

	function findAgentBy(id) {
		return _.findWhere(WHITELISTED_AGENTS, {
			"id": id
		});
	}

	function findEmployerBy(id) {
		return _.findWhere(WHITELISTED_EMPLOYERS, {
			"id": id
		});
	}

	function newUser(id, firstName, lastName, type) {
		return new User.model({
			userID: id,
			type: type,
			name: {
				first: firstName,
				last: lastName
			},
			canAccessKeystone: false
		});
	}

	function signInAgent(agent, success) {
		var user = newUser(agent.id, agent.firstName, agent.firstName, 'AGENT');
		keystone.session.signinWithUser(user, req, res, success);
	}

	function signInEmployer(employer, success) {
		var user = newUser(employer.id, employer.firstName, employer.firstName, 'EMPLOYER');
		keystone.session.signinWithUser(user, req, res, success);
	}

	view.on('post', function(next) {
		var agent = findAgentBy(req.body.id);
		if (agent) {
			signInAgent(agent, function(user) {
				req.session.user = res.locals.user = user;
				res.render('agent-home');
			});
		} else if (employer = findEmployerBy(req.body.id)) {
			signInEmployer(employer, function(user) {
				req.session.user = res.locals.user = user;
				res.render('employer-home');
			});
		} else {
			res.status(401);
			res.render('errors/401');
		}
	});

	view.render('agent-login');
};
