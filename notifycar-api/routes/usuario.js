var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* GET /usuario */
router.get('/', function(req, res, next) {
  Usuario.find(function (err, usuarios) {
    if (err) return next(err);
    res.json(usuarios);
  });
});

/* POST /usuario */
router.post('/', function(req, res, next) {
  Usuario.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;