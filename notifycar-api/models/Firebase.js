var mongoose = require('mongoose');

var FirebaseSchema = new mongoose.Schema({
  emailUsuario: {
    type: String, 
    required: [ true, 'Informe um email válido!' ], 
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: '{VALUE} não é um email válido!'
    },
    unique: true 
  },
  fcmId: { type: String, required: [ true, 'Informe o token do Firebase Cloud Messenger!' ] },
  atualizadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Firebase', FirebaseSchema);
