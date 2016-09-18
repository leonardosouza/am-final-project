var mongoose = require('mongoose');

var LocalizacaoSchema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  bloqueado: Boolean,
  alarmeDisparado: Boolean,
  veiculoId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Localizacao', LocalizacaoSchema);
