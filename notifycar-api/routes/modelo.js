var express = require('express');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Modelo = require('../models/Modelo.js');

/* GET /modelo */
router.get('/', function(req, res, next) {
  Modelo.find(function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /modelo/:id */
router.get('/:id?', function(req, res, next) {
  Modelo.findById(req.params.id, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /modelo/:idFabricante */
router.get('/fabricante/:idFabricante?', function(req, res, next) {
  Modelo.find({ fabricanteId: req.params.idFabricante }, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /modelo */
router.post('/', function(req, res, next) {
  Modelo.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* PUT /modelo/:id */
router.put('/:id?', function(req, res, next) {
  Modelo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /modelo/:id */
router.delete('/:id?', function(req, res, next) {
  Modelo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;