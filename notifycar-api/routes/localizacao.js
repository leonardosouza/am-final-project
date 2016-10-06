var express = require('express');
var error = require('../config/error.js');
var router = express.Router();
var mongoose = require('mongoose');
var Localizacao = require('../models/Localizacao.js');

/* GET /localizacao */
// router.get('/', function(req, res, next) {
//   Localizacao.find(function (err, post) {
//     if (err) return res.status(400).json(err);
//     if (post === null) res.status(404).json(error.notFound);
//     res.json(post);
//   });
// });

/* POST /localizacao */
router.post('/', function(req, res, next) {
  Localizacao.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});

/* GET /localizacao/:id */
router.get('/:id', function(req, res, next) {
  Localizacao.findById(req.params.id, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /localizacao/veiculo/:id */
router.get('/veiculo/:id/:limit?/:order?', function(req, res, next) {
  Localizacao
    .find({ 'veiculoId': req.params.id } , function (err, post) {
      if (err) return res.status(400).json(err);
      if (post === null) res.status(404).json(error.notFound);
      if(post.length > 1) {
        res.json(post);
      } else {
        res.json(post[0]);
      }
    })
    .limit(req.params.limit || 100)
    .sort(req.params.order === 'ASC' ? {} : { _id: -1 });
});

/* PUT /localizacao/:id */
router.put('/:id?', function(req, res, next) {
  Localizacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /localizacao/:id */
router.delete('/:id?', function(req, res, next) {
  Localizacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

module.exports = router;