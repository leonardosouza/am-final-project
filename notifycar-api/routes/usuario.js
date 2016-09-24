var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

/* GET /usuario */
router.get('/', function(req, res, next) {
  Usuario.find(function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* POST /usuario */
router.post('/', function(req, res, next) {
  Usuario.create(req.body, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* GET /usuario/:id */
router.get('/:id', function(req, res, next) {
  Usuario.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* PUT /usuario/:id */
router.put('/:id', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

/* DELETE /usuario/:id */
router.delete('/:id', function(req, res, next) {
  Usuario.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    res.json(post);
  });
});

module.exports = router;