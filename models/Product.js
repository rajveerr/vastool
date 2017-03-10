var keystone = require('keystone');
var _ = require('underscore');
var Types = keystone.Field.Types;

// Product Model

var Product = new keystone.List('Product', {
  map: { name: 'title' },
  singular: 'Product',
  plural: 'Products',
  autokey: { from: 'title', path: 'slug', unique: true }
});

Product.add({
  title: { type: String, required: true },
  price: { type: Types.Money, required: true, initial: true },
  free: { type: Boolean },
  shortDescription: { type: String },
  details: { type: Types.Html, wysiwyg: true, height: 400 },
  servicesIncluded: { type: Types.Textarea},
  bestFor: { type: String},
  benefitsForEmployees: { type: Types.Textarea},
  benefitsForEmployer: { type: Types.Textarea},
});

Product.schema.methods.getServicesIncludedAsArray = function() {
  return splitBy(this.servicesIncluded, '#');
};

Product.schema.methods.getBenefitsForEmployeesAsArray = function() {
  return splitBy(this.benefitsForEmployees, '#');
};

Product.schema.methods.getBenefitsForEmployerAsArray = function() {
  return splitBy(this.benefitsForEmployer, '#');
};

function splitBy(value, delimiter) {
  return _.compact(value.split(delimiter));
}

Product.register();
