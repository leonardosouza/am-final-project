var express = require('express');
var router = express.Router();

/* GET /gateway/lock */
router.get('/lock', function(req, res, next) {
  res.render('lock', { title: 'Express' });
});

/* GET /gateway/unlock */
router.get('/unlock', function(req, res, next) {
  res.render('unlock', { title: 'Express' });
});

/* GET /gateway/reset */
router.get('/reset', function(req, res, next) {
  res.render('reset', { title: 'Express' });
});

module.exports = router;