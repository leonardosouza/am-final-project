var express = require('express');
var error = require('../config/error.js');
var router = express.Router();
var mongoose = require('mongoose');
var Veiculo = require('../models/Veiculo.js');

/* GET /veiculo */
router.get('/', function(req, res, next) {
  Veiculo.find(function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /veiculo/:id */
router.get('/:id', function(req, res, next) {
  Veiculo.findById(req.params.id, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* POST /veiculo */
router.post('/', function(req, res, next) {
  Veiculo.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});

/* PUT /veiculo/:id */
router.put('/:id?', function(req, res, next) {
  Veiculo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /veiculo/:id */
router.delete('/:id?', function(req, res, next) {
  Veiculo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

module.exports = router;