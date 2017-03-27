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
  averageAgeOfEmployees: {type: Number, format: '0,0'},
  offersMajorInsurancePlan: {type: Boolean},
  majorInsurancePlan: {type: String},
  newMajorMedicalPlanName: {type: String},
  freeBenefit: {type: Types.Code, language: 'json'},
  additionalBenefits: {type: Types.Code, language: 'json', height: 600},
  employeePreferredBenefits: {type: Types.Code, language: 'json', height: 600, noedit: true},
  popsEngagement: {type: String},
  selectedBenefits: {type: Boolean, default: true},
  popsDone: {type: Boolean},
  applicationSubmitted: {type: Boolean},
  notesFromProducer: {type: Types.Textarea},
  userId: {type: String}
});

Employer.schema.post('init', function(employer) {
  employer.freeBenefit = beautifyJSON(employer.freeBenefit);
  employer.additionalBenefits = beautifyJSON(employer.additionalBenefits);
  employer.employeePreferredBenefits = beautifyJSON(employer.employeePreferredBenefits);
});

function beautifyJSON(jsonString) {
  if (jsonString) {
    return JSON.stringify(JSON.parse(jsonString), null, "\t");
  }
  return '';
}

Employer.schema.methods.getEmployeePreferredBenefitsAsJson = function() {
  return JSON.parse(this.employeePreferredBenefits);
};


Employer.register();
