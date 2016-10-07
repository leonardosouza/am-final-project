var express = require('express');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Fabricante = require('../models/Fabricante.js');

/* GET /fabricante */
router.get('/', function(req, res, next) {
  Fabricante.find(function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /fabricante */
router.post('/', function(req, res, next) {
  Fabricante.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /fabricante/:id */
router.get('/:id', function(req, res, next) {
  Fabricante.findById(req.params.id, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* PUT /fabricante/:id */
router.put('/:id?', function(req, res, next) {
  Fabricante.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /fabricante/:id */
router.delete('/:id?', function(req, res, next) {
  Fabricante.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;