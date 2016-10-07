var express = require('express');
var error = require('../utils/error.js');
var parser = require('../utils/parser-response.js');
var router = express.Router();
var mongoose = require('mongoose');
var Gateway = require('../models/Gateway.js');

/* POST /gateway/register */
router.post('/register', function(req, res, next) {
  Gateway.create(req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* GET /gateway/register/:id */
router.get('/register/', function(req, res, next) {
  Gateway.find(function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* GET /gateway/register/:id/:limit */
router.get('/register/:id/:limit?', function(req, res, next) {
  Gateway
    .find({ 'deviceId': req.params.id }, function (err, post) {
      parser.error(res, 400, err);
      parser.notFound(res, 404, post, error.notFound);
      parser.success(res, 200, post);
    })
    .limit(req.params.limit || 1)
    .sort({ _id: -1 });
});

/* PUT /gateway/register/:id */
router.put('/register/:id?', function(req, res, next) {
  Gateway.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* DELETE /gateway/register/:id */
router.delete('/register/:id?', function(req, res, next) {
  Gateway.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    parser.error(res, 400, err);
    parser.notFound(res, 404, post, error.notFound);
    parser.success(res, 200, post);
  });
});

/* DELETE /gateway/register/deivce/:id */
router.delete('/register/device/:id?', function(req, res, next) {
  Gateway
    .findByIdAndRemove({ 'deviceId': req.params.id }, req.body, function (err, post) {
      parser.error(res, 400, err);
      parser.notFound(res, 404, post, error.notFound);
      parser.success(res, 200, post);
    });
});

module.exports = router;