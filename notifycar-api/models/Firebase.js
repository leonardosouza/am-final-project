var mongoose = require('mongoose');

var FirebaseSchema = new mongoose.Schema({
  emailUsuario: { type: String, required: [ true, 'Informe o email do Usuario!' ] },
  fcmId: { type: String, required: [ true, 'Informe o token do Firebase Cloud Messenger!' ] },
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Firebase', FirebaseSchema);
