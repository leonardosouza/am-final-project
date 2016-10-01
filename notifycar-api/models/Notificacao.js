var mongoose = require('mongoose');

var NotificacaoSchema = new mongoose.Schema({
  titulo: String,
  mensagem: String,
  usuarioId: String,
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notificacao', NotificacaoSchema);
