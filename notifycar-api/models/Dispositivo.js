var mongoose = require('mongoose');

var DispositivoSchema = new mongoose.Schema({
  deviceId: String,
  veiculoId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dispositivo', DispositivoSchema);
