var server = require('./webservers');
var tunnel = require('./tunnelling');
var serial = require('./serial-comm');

/** Websocket Listenning **/
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('Client connected.');
  socket.emit('tunnel', { name: tunnel.url });

  socket.on('command', function (data) {
    serial.sendData(data);
  });
});