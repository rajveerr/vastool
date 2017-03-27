/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function(app) {
	// Views
	app.get('/', routes.views['agent-login']);
	app.post('/', routes.views['agent-login']);

	// protected
	app.get('/agent-home', function(req, res) {
		new keystone.View(req, res).render('agent-home');
	});

	app.get('/agent-dashboard', middleware.requireUser, routes.views[
		'agent-dashboard']);
	app.post('/agent-dashboard', middleware.requireUser, routes.views[
		'agent-dashboard']);

	app.get('/employer/:slug/application-status', middleware.requireUser, routes.views[
		'application-status']);
	app.post('/employer/:slug/application-status', middleware.requireUser, routes.views[
		'application-status']);

	app.get('/employer/:slug/employee-preference', middleware.requireUser, routes.views[
		'employee-preference']);
	app.post('/employer/:slug/employee-preference', middleware.requireUser, routes.views[
		'employee-preference']);

	app.get('/employer-home', middleware.requireUser, routes.views[
		'employer-home']);
	app.post('/employer-home', middleware.requireUser, routes.views[
		'employer-home']);

	app.get('/new-employer', middleware.requireUser, routes.views['new-employer']);
	app.post('/new-employer', middleware.requireUser, routes.views['new-employer']);

	app.get('/products/:product', middleware.requireUser, routes.views.product);

	app.get('/free-products', middleware.requireUser, routes.views[
		'free-products']);
	app.post('/free-products', middleware.requireUser, routes.views[
		'free-products']);

	app.get('/additional-products', middleware.requireUser, routes.views[
		'additional-products']);
	app.post('/additional-products', middleware.requireUser, routes.views[
		'additional-products']);

	app.get('/summary', middleware.requireUser, routes.views.summary);
	app.post('/summary', middleware.requireUser, routes.views.summary);

	app.post('/confirm', middleware.requireUser, routes.views.confirmation);

	app.all('/feedback', middleware.requireUser, routes.views.feedback);

	app.get('/tips/:tip', middleware.requireUser, routes.views['producer_tip']);

	app.get('/thank-you', middleware.requireUser, routes.views['thank-you']);
};
