var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Localizacao = require('../models/Localizacao.js');

/* GET /localizacao */
router.get('/', function(req, res, next) {
  Localizacao.find(function (err, localizacaos) {
    if (err) return next(err);
    res.json(localizacaos);
  });
});

/* POST /localizacao */
router.post('/', function(req, res, next) {
  Localizacao.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;