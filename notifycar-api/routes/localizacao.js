var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Localizacao = require('../models/Localizacao.js');

/* GET /localizacao */
router.get('/', function(req, res, next) {
  Localizacao.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /localizacao */
router.post('/', function(req, res, next) {
  Localizacao.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /localizacao/:id */
router.get('/:id', function(req, res, next) {
  Localizacao.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /localizacao/:id */
router.put('/:id', function(req, res, next) {
  Localizacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /localizacao/:id */
router.delete('/:id', function(req, res, next) {
  Localizacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;