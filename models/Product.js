var keystone = require('keystone');
var Types = keystone.Field.Types;

// Product Model

var Product = new keystone.List('Product', {
  map: { name: 'title' },
  singular:'Product',
  plural:'Products',
  autokey: { path: 'id', from: 'title', unique: true }
});

Product.add({
  title: { type: String, required: true },
  price: { type: Number, required: true, initial: null},
  free: { type: Boolean },
  shortDescription: { type: String },
  details: { type: Types.Html, wysiwyg: true, height: 400 },
  bestFor: { type: String }
});

Product.register();
