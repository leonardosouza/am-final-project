var mongoose = require('mongoose');

var EstacionamentoSchema = new mongoose.Schema({
  localizacao: [],
  dispositivoId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Estacionamento', EstacionamentoSchema);
