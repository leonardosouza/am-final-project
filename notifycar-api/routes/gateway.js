var express = require('express');
var router = express.Router();
var socket = require('socket.io-client')('http://localhost:8080')

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