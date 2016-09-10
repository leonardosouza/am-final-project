var express = require('express');
var router = express.Router();
var https = require('https');

https.globalAgent.options.rejectUnauthorized = false;

// Connect to server
var io = require('socket.io-client');
var socket = io.connect('localhost:8888', { reconnect: true, agent: https.globalAgent });

// Add a connect listener
socket.on('connect', function() { 
    console.log('Socket :)');
    // socket.emit('command', 'L');
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

module.exports = router;