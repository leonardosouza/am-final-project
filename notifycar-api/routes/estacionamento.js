var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Estacionamento = require('../models/Estacionamento.js');

/* GET /estacionamento */
router.get('/', function(req, res, next) {
  Estacionamento.find(function (err, estacionamentos) {
    if (err) return next(err);
    res.json(estacionamentos);
  });
});

/* POST /estacionamento */
router.post('/', function(req, res, next) {
  Estacionamento.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;