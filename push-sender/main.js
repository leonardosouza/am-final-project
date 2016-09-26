var FCM = require ('./node_modules/fcm-push');
var firebase = require ('./node_modules/firebase');

firebase.initializeApp({
  serviceAccount: "./NotifyCar-3545f3eeb2c7.json",
  databaseURL: "https://notifycar-b9f1a.firebaseio.com/"});


var serverKey = 'AIzaSyBJLI_z_WNuC6V_l-HNid7R7if-W2b2beI';
var fcm = new FCM(serverKey);
var idToken = "ebsEIYkBgPI:APA91bEdC4kIrLdmc1kHcbXZMk3qDJJS0lPkcTV4Pz0VL3x8NhSqmcCNF9m64XwBI5wgcR217EeDMa3nPna8K-GmKwUkVS4lKZu_0oSe9YPlPKZ7UBvVzU4PpV8mVkZz3ol_k32D3YnB";



var message = {
    to: idToken,
    collapse_key: 'notification', 
    data: {
        movement: true
    },
    notification: {
        title: 'Atenção!',
        body: 'Carro em movimento'
    }
};

var send = fcm.send;

//valida idToken do dispostivo
firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
	var uid = decodedToken.uid;
	console.log('UID',uid);
	send(message).then(function(response){
        	console.log("Successfully sent with response: ", arguments);
   	 })
    	.catch(function(err){
       		console.log("Something has gone wrong!");
        	console.error(err);
    	})

}).catch(function(error) {
	console.error('idToken invalido');
	console.error(error);
});

