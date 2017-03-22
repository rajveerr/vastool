var keystone = require('keystone');
var ProducerTip = keystone.list('ProducerTip');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
	var locals = res.locals;
  locals.data = {};

  view.on('init', function(next) {
    ProducerTip.model.findOne({
      slug: req.params.tip
    })
    .exec()
    .then(function(tip) {
      if (req.headers.accept.split(',').includes('application/json')) {
        res.send(JSON.stringify(tip));
      } else {
        locals.data.tip = tip;
        next();
      }
    }).catch(function(err) {
      next(err);
    });
  });

  view.render('producer_tip');
};
