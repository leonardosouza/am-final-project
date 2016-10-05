var FCM = require('fcm-node');

var serverKey = 'AIzaSyBJLI_z_WNuC6V_l-HNid7R7if-W2b2beI';
var fcm = new FCM(serverKey);

var message = {
    to: 'cVcc-6tob8g:APA91bFob12Lr_obVpqWEWgGG8t9Egwi-QvkYU2DoLZOJVusgPvu81m0cCOaKXw9wNfHDtwS1EBeVFLq8t9wuRAw51zEUiDySY_kvXmwRkiuLTV4pKwLGzSAWbdxvGsl690mwsiwFT7A', 
    collapse_key: 'carro',
    notification: {
        title: 'Carro em movimento', 
        body: 'Atenção!! Seu carro está em movimento' 
    },

};

fcm.send(message, function(err, response){
    if (err) {
        console.log("Mensagem não enviada!");
    } else {
        console.log("Mensagem enviada com sucesso: ", response);
    }
});