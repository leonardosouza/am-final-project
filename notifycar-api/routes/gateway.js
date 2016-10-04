var express = require('express');
var error = require('../config/error.js');
var router = express.Router();
var https = require('https');
var mongoose = require('mongoose');
var Gateway = require('../models/Gateway.js');

/* POST /gateway/register */
router.post('/register', function(req, res, next) {
  Gateway.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});

/* GET /gateway/register/:id */
router.get('/register/', function(req, res, next) {
  Gateway.find(function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /gateway/register/:id/:limit */
router.get('/register/:id/:limit?', function(req, res, next) {
  Gateway
    .find({ 'deviceId': req.params.id }, function (err, post) {
      if (err) return res.status(400).json(err);
      if (post === null) res.status(404).json(error.notFound);
      res.json(post);
    })
    .limit(req.params.limit || 1)
    .sort({ _id: -1 });
});

/* PUT /gateway/register/:id */
router.put('/register/:id?', function(req, res, next) {
  Gateway.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /gateway/register/:id */
router.delete('/register/:id?', function(req, res, next) {
  Gateway.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /gateway/register/deivce/:id */
router.delete('/register/device/:id?', function(req, res, next) {
  Gateway
    .findByIdAndRemove({ 'deviceId': req.params.id }, req.body, function (err, post) {
      if (err) return res.status(400).json(err);
      if (post === null) res.status(404).json(error.notFound);
      res.json(post);
    });
});

module.exports = router;