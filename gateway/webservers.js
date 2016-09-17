var https = require('https');
var fs = require('fs');
var app = require('express')();
var serial = require('./serial-comm');

var options = {
    key: fs.readFileSync('../certificates/server.key'),
    cert: fs.readFileSync('../certificates/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
var DEFAULT_PORT = 8888,
    PROXY_PORT = 8887;

/** WebServer Listenning **/
var server = require('https').Server(options, app);
server.listen(DEFAULT_PORT, function() {
    console.log("server started at port " + DEFAULT_PORT);  
});

/** Proxy WebServer Listenning **/
var proxy = require('http').Server(app);
proxy.listen(PROXY_PORT, function() {
  console.log("proxy started at port " + PROXY_PORT);  
});

// /** Proxy Routes **/
// app.get('/lock', function(req, res) {
//   serial.sendData('L');
//   res.send('Locked');
// });

// app.get('/unlock', function(req, res) {
//   serial.sendData('U');
//   res.send('Unlocked');
// });

// app.get('/reset', function(req, res) {
//   serial.sendData('R');
//   res.send('Reset');
// });

module.exports = {
  app: app,
  server: server
};