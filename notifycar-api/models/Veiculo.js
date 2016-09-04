var mongoose = require('mongoose');

var VeiculoSchema = new mongoose.Schema({
  modelo: String,
  cor: String,
  ano: Number,
  usuarioId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);
