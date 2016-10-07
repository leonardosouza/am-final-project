var express = require('express');
var error = require('../utils/error.js');
var response = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Twilio = require('../models/Twilio.js');

/* GET /twilio */
router.get('/', function(req, res, next) {
  Twilio.find(function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* GET /twilio/:id */
router.get('/:id', function(req, res, next) {
  Twilio.findById(req.params.id, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* POST /twilio */
router.post('/', function(req, res, next) {
  Twilio.create(req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

/* PUT /twilio/:id */
router.put('/:id?', function(req, res, next) {
  Twilio.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, req.body, error.notFound);
  });
});

/* DELETE /twilio/:id */
router.delete('/:id?', function(req, res, next) {
  Twilio.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    response.error(res, 400, err);
    
    response.success(res, 200, post, error.notFound);
  });
});

module.exports = router;