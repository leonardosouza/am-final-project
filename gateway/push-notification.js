var env = require('dotenv').config();
var fcmServerKey = process.env.FCM_SERVER_KEY;
var firebaseCloudMessaging = require('fcm-node');
var fcm = new firebaseCloudMessaging(fcmServerKey);

var sendPushNotification = function(message) {
  fcm.send(message, function(err, res){
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports = sendPushNotification;

