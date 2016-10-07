var express = require('express');
var error = require('../utils/error.js');
var parser = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Veiculo = require('../models/Veiculo.js');

/* GET /veiculo */
router.get('/', function(req, res, next) {
  Veiculo.find(function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* GET /veiculo/:id */
router.get('/:id', function(req, res, next) {
  Veiculo.findById(req.params.id, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* POST /veiculo */
router.post('/', function(req, res, next) {
  Veiculo.create(req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* PUT /veiculo/:id */
router.put('/:id?', function(req, res, next) {
  Veiculo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* DELETE /veiculo/:id */
router.delete('/:id?', function(req, res, next) {
  Veiculo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

module.exports = router;