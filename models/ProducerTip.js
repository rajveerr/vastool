var keystone = require('keystone');
var Types = keystone.Field.Types;

var ProducerTip = new keystone.List('ProducerTip', {
  autokey: { path: 'slug', from: 'id', unique: true },
  map: { name: 'name' },
  singular: 'Producer Tip',
  plural: 'Producer Tips'
});

ProducerTip.add({
  title: {type:String, required: true, initial: true},
  subtitle: {type: String, required: true, initial: true},
  details: { type: Types.Html, wysiwyg: true, height: 400 }
});

ProducerTip.register();
