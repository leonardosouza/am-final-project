var express = require('express');
var error = require('../config/error.js');
var router = express.Router();
var mongoose = require('mongoose');
var Modelo = require('../models/Modelo.js');

/* GET /modelo */
router.get('/', function(req, res, next) {
  Modelo.find(function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /modelo/:id */
router.get('/:id?', function(req, res, next) {
  Modelo.findById(req.params.id, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /modelo/:idFabricante */
router.get('/fabricante/:idFabricante?', function(req, res, next) {
  Modelo.find({ fabricanteId: req.params.idFabricante }, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* POST /modelo */
router.post('/', function(req, res, next) {
  Modelo.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});



/* PUT /modelo/:id */
router.put('/:id?', function(req, res, next) {
  Modelo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /modelo/:id */
router.delete('/:id?', function(req, res, next) {
  Modelo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

module.exports = router;