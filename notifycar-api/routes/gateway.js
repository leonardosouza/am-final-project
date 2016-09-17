var express = require('express');
var router = express.Router();
var https = require('https');
var mongoose = require('mongoose');
var Gateway = require('../models/Gateway.js');

https.globalAgent.options.rejectUnauthorized = false;

// Connect to server
var io = require('socket.io-client');
var socket = io.connect('localhost:8888', { reconnect: true, agent: https.globalAgent });

// Add a connect listener
socket.on('connect', function() { 
    console.log('Socket :)');
});

socket.on('connect_error', function(socket) { 
    console.log('Socket :(', socket);
});

socket.on('tunnel', function(data) {
  console.log('Tunnel is', data);
});

/* GET /gateway/lock */
router.get('/lock', function(req, res, next) {
  if(socket) {
    socket.emit('command', 'L');
    res.json({ carStatus: 'locked' });  
  } else {
    res.json({ error: 'Action is not avaiable' });  
  }
});

/* GET /gateway/unlock */
router.get('/unlock', function(req, res, next) {
  if(socket) {
    socket.emit('command', 'U');
    res.json({ carStatus: 'unlocked' });  
  } else {
    res.json({ error: 'Action is not avaiable' });  
  }
});

/* GET /gateway/reset */
router.get('/reset', function(req, res, next) {
  if(socket) {
    socket.emit('command', 'R');
    res.json({ carStatus: 'reset' });  
  } else {
    res.json({ error: 'Action is not avaiable' });  
  }
});

/* POST /gateway/register */
router.post('/register', function(req, res, next) {
  Gateway.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /gateway/register/:id */
router.get('/register/', function(req, res, next) {
  Gateway.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/register/:id/:limit?', function(req, res, next) {
  Gateway
    .find({ 'deviceId': req.params.id }, function (err, post) {
      if (err) return next(err);
      res.json(post);
    })
    .limit(req.params.limit || 1)
    .sort({ _id: -1 });
});

/* PUT /gateway/register/:id */
router.put('/register/:id', function(req, res, next) {
  Gateway.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;