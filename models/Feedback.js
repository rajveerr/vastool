var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Feedback = new keystone.List('Feedback', {
	nocreate: true,
	noedit: true,
	defaultColumns: 'userType,userID,emotion,comment,email'
});

Feedback.add({
	userType: {
		type: String
	},
	userName: {
		type: String
	},
	userID: {
		type: String
	},
	emotion: {
		type: String,
		required: true
	},
	comment: {
		type: Types.Textarea,
		required: true
	},
	email: {
		type: Types.Email
	}
});

Feedback.register();
