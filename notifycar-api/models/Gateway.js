var mongoose = require('mongoose');

var GatewaySchema = new mongoose.Schema({
  deviceId: String,
  remoteControl: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gateway', GatewaySchema);
