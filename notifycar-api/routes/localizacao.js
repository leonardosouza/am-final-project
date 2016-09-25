var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Localizacao = require('../models/Localizacao.js');

/* GET /localizacao */
router.get('/', function(req, res, next) {
  Localizacao.find(function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* POST /localizacao */
router.post('/', function(req, res, next) {
  Localizacao.create(req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* GET /localizacao/:id */
router.get('/:id', function(req, res, next) {
  Localizacao.findById(req.params.id, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* GET /localizacao/veiculo/:id */
router.get('/veiculo/:id', function(req, res, next) {
  Localizacao.find({ 'veiculoId': req.params.id } , function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* PUT /localizacao/:id */
router.put('/:id?', function(req, res, next) {
  Localizacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

/* DELETE /localizacao/:id */
router.delete('/:id?', function(req, res, next) {
  Localizacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(err);
    if (post === null) return res.json({ message: 'Object not found', name: 'NullError' });
    res.json(post);
  });
});

module.exports = router;