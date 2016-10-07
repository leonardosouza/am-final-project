var express = require('express');
var error = require('../utils/error.js');
var parser = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Fabricante = require('../models/Fabricante.js');

/* GET /fabricante */
router.get('/', function(req, res, next) {
  Fabricante.find(function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* POST /fabricante */
router.post('/', function(req, res, next) {
  Fabricante.create(req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* GET /fabricante/:id */
router.get('/:id', function(req, res, next) {
  Fabricante.findById(req.params.id, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* PUT /fabricante/:id */
router.put('/:id?', function(req, res, next) {
  Fabricante.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* DELETE /fabricante/:id */
router.delete('/:id?', function(req, res, next) {
  Fabricante.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

module.exports = router;