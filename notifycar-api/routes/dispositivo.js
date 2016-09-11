var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dispositivo = require('../models/Dispositivo.js');

/* GET /dispositivo */
router.get('/', function(req, res, next) {
  Dispositivo.find(function (err, dispositivos) {
    if (err) return next(err);
    res.json(dispositivos);
  });
});

/* POST /dispositivo */
router.post('/', function(req, res, next) {
  Dispositivo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;