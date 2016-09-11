var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Modelo = require('../models/Modelo.js');

/* GET /modelo */
router.get('/', function(req, res, next) {
  Modelo.find(function (err, modelos) {
    if (err) return next(err);
    res.json(modelos);
  });
});

/* POST /modelo */
router.post('/', function(req, res, next) {
  Modelo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;