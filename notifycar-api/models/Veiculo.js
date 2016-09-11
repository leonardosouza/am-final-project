var mongoose = require('mongoose');

var VeiculoSchema = new mongoose.Schema({
  cor: String,
  ano: Number,
  placa: String,
  modeloId: String,
  usuarioId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);
