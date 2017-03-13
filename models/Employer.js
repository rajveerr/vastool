var keystone = require('keystone');
var Types = keystone.Field.Types;

var Employer = new keystone.List('Employer', {
  map: { name: 'name' },
  singular: 'Employer',
  plural: 'Employers',
  autokey: { from: 'name', path: 'slug', unique: true },
  nocreate: true
});

Employer.add({
  name: {type: String, required: true},
  numberOfEmployees: {type: Number, required: true, format: '0,0'},
  averageAgeOfEmployees: {type: Number, required: true, format: '0,0'},
  offersMajorInsurancePlan: {type: Boolean}
});

Employer.register();
