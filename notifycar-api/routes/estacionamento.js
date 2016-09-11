var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Estacionamento = require('../models/Estacionamento.js');

/* GET /estacionamento */
router.get('/', function(req, res, next) {
  Estacionamento.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /estacionamento */
router.post('/', function(req, res, next) {
  Estacionamento.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /estacionamento/:id */
router.get('/:id', function(req, res, next) {
  Estacionamento.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /estacionamento/:id */
router.put('/:id', function(req, res, next) {
  Estacionamento.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /estacionamento/:id */
router.delete('/:id', function(req, res, next) {
  Estacionamento.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;