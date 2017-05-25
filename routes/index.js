var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send(req);
  // res.render('index', { title: 'Kioscos interactivos' });
});

module.exports = router;
