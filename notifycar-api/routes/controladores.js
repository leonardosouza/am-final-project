var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Controlador = require('../models/Controlador.js');

/* GET /controladores */
router.get('/', function(req, res, next) {
  Controlador.find(function (err, controladores) {
    if (err) return next(err);
    res.json(controladores);
  });
});

/* POST /controladores */
router.post('/', function(req, res, next) {
  Controlador.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;