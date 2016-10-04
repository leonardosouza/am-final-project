var express = require('express');
var error = require('../config/error.js');
var router = express.Router();
var mongoose = require('mongoose');
var Notificacao = require('../models/Notificacao.js');

/* GET /notificacao */
router.get('/', function(req, res, next) {
  Notificacao.find(function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /notificacao/:id */
router.get('/:id', function(req, res, next) {
  Notificacao.findById(req.params.id, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* POST /notificacao */
router.post('/', function(req, res, next) {
  Notificacao.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});

/* PUT /notificacao/:id */
router.put('/:id?', function(req, res, next) {
  Notificacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /notificacao/:id */
router.delete('/:id?', function(req, res, next) {
  Notificacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

module.exports = router;