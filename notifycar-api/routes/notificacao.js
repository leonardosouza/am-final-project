var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Notificacao = require('../models/Notificacao.js');

/* GET /notificacao */
router.get('/', function(req, res, next) {
  Notificacao.find(function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* GET /notificacao/:id */
router.get('/:id', function(req, res, next) {
  Notificacao.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* POST /notificacao */
router.post('/', function(req, res, next) {
  Notificacao.create(req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* PUT /notificacao/:id */
router.put('/:id?', function(req, res, next) {
  Notificacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* DELETE /notificacao/:id */
router.delete('/:id?', function(req, res, next) {
  Notificacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

module.exports = router;