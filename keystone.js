// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

var bourbon = require("node-bourbon").includePaths,
	neat = require("node-neat").includePaths,
	refills = require("node-refills").includePaths;

keystone.init({
	'name': 'VAS Admin',
	'brand': 'VAS Admin',
	'sass': 'public',
	'sass options': {
		includePaths: bourbon,
		includePaths: neat,
		includePaths: refills
	},
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'session store': 'mongo',
	'signout redirect': '/',
	'cookie secret': 'w~K8=&5r%U2]EZ'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	Benefits: 'products',
	Employers: 'employers',
	Tips: 'producer-tips'
});

keystone.set('mongo',
	'mongodb://vas:Aflac2017@ds011860.mlab.com:11860/heroku_l3wq2whs');

keystone.start();
