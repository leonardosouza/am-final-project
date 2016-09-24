var FCM = require ('./node_modules/fcm-push');

var serverKey = '';
var fcm = new FCM(serverKey);

var message = {
    to: 'edd053b5918aee1e', // DeviceID
    collapse_key: 'notify about movement', //Key to message
    data: {
        your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
        title: 'Carro em movimento',
        body: 'Atenção, identificamos que seu carro está em movimento.'
    }
};

//callback style
fcm.send(message, function(err, response){
    if (err) {
        console.log("Falha ao enviar a mensagem");
    } else {
        console.log("Mensagem enviada com sucesso", response);
    }
});

//promise style
fcm.send(message)
    .then(function(response){
        console.log("Successfully sent with response: ", response);
    })
    .catch(function(err){
        console.log("Something has gone wrong!");
        console.error(err);
    })
