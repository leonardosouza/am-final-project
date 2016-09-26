var FCM = require ('./node_modules/fcm-push');
var firebase = require ('./node_modules/firebase');

firebase.initializeApp({
  serviceAccount: "./NotifyCar-3545f3eeb2c7.json",
  databaseURL: "https://notifycar-b9f1a.firebaseio.com/"});


var serverKey = 'AIzaSyBJLI_z_WNuC6V_l-HNid7R7if-W2b2beI';
var fcm = new FCM(serverKey);

var message = {
    to: "ebsEIYkBgPI:APA91bEdC4kIrLdmc1kHcbXZMk3qDJJS0lPkcTV4Pz0VL3x8NhSqmcCNF9m64XwBI5wgcR217EeDMa3nPna8K-GmKwUkVS4lKZu_0oSe9YPlPKZ7UBvVzU4PpV8mVkZz3ol_k32D3YnB",
    notification: {
        title: 'Carro em movimento',
        body: 'Atenção!'
    }
};

//promise style
var f = fcm.send;
f(message).then(function(response){
        console.log("Successfully sent with response: ", arguments);
    })
    .catch(function(err){
        console.log("Something has gone wrong!",arguments);
        console.error(err);
    })


