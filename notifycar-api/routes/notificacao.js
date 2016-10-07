var express = require('express');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Notificacao = require('../models/Notificacao.js');

/* GET /notificacao */
router.get('/', function(req, res, next) {
  Notificacao.find(function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /notificacao/:id */
router.get('/:id', function(req, res, next) {
  Notificacao.findById(req.params.id, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /notificacao */
router.post('/', function(req, res, next) {
  Notificacao.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* PUT /notificacao/:id */
router.put('/:id?', function(req, res, next) {
  Notificacao.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /notificacao/:id */
router.delete('/:id?', function(req, res, next) {
  Notificacao.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;