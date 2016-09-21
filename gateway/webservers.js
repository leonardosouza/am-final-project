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

module.exports = {
  app: app,
  server: server
};