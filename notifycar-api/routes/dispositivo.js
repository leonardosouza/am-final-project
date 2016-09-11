var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Dispositivo = require('../models/Dispositivo.js');

/* GET /dispositivo */
router.get('/', function(req, res, next) {
  Dispositivo.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST /dispositivo */
router.post('/', function(req, res, next) {
  Dispositivo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /dispositivo/:id */
router.get('/:id', function(req, res, next) {
  Dispositivo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /dispositivo/:id */
router.put('/:id', function(req, res, next) {
  Dispositivo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /dispositivo/:id */
router.delete('/:id', function(req, res, next) {
  Dispositivo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;