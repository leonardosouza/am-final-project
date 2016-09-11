var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Veiculo = require('../models/Veiculo.js');

/* GET /veiculo */
router.get('/', function(req, res, next) {
  Veiculo.find(function (err, veiculos) {
    if (err) return next(err);
    res.json(veiculos);
  });
});

/* POST /veiculo */
router.post('/', function(req, res, next) {
  Veiculo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;