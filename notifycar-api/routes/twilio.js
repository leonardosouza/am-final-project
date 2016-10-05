var express = require('express');
var error = require('../config/error.js');
var router = express.Router();
var mongoose = require('mongoose');
var Twilio = require('../models/Twilio.js');

/* GET /twilio */
router.get('/', function(req, res, next) {
  Twilio.find(function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* GET /twilio/:id */
router.get('/:id', function(req, res, next) {
  Twilio.findById(req.params.id, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* POST /twilio */
router.post('/', function(req, res, next) {
  Twilio.create(req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.status(201).json(post);
  });
});

/* PUT /twilio/:id */
router.put('/:id?', function(req, res, next) {
  Twilio.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

/* DELETE /twilio/:id */
router.delete('/:id?', function(req, res, next) {
  Twilio.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.status(400).json(err);
    if (post === null) res.status(404).json(error.notFound);
    res.json(post);
  });
});

module.exports = router;