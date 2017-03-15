var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Feedback = new keystone.List('Feedback', {
	nocreate: true,
	noedit: true,
});

Feedback.add({
	comment: {
		type: String,
		required: true
	},
});

Feedback.register();
