var keystone = require('keystone');
var Feedback = keystone.list('Feedback');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'feedback';
	locals.data = {};

	// On POST requests, add the Feedback item to the database

	view.on('post', function(next) {
		var newFeedback = newFeedbackFromRequest();
		save(newFeedback);
		next();
	});

	function newFeedbackFromRequest() {
		console.log(req.session.user);
		return {
			emotion: req.body.feedbackEmotion,
			comment: req.body.feedbackComment,
			email: req.body.feedbackProviderEmail,
			userType: req.session.user.type,
			userFirstName: req.session.user.firstName,
			userID: req.session.user.userID
		};
	}

	function save(feedback) {
		Feedback.model(feedback).save(function(err) {
			if (err) {
				console.log('feedback save failed', err);
				next(err);
			}
		});
	}

	view.render('feedback');
};
