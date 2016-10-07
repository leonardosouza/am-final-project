var express = require('express');
var error = require('../utils/error.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/health-check', function(req, res, next) {
  res.render('health-check', {});
});

module.exports = router;
