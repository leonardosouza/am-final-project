var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Fabricante = require('../models/Fabricante.js');

/* GET /fabricante */
router.get('/', function(req, res, next) {
  Fabricante.find(function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* POST /fabricante */
router.post('/', function(req, res, next) {
  Fabricante.create(req.body, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* GET /fabricante/:id */
router.get('/:id', function(req, res, next) {
  Fabricante.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* PUT /fabricante/:id */
router.put('/:id', function(req, res, next) {
  Fabricante.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* DELETE /fabricante/:id */
router.delete('/:id', function(req, res, next) {
  Fabricante.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

module.exports = router;