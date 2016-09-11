var mongo = process.env.VCAP_SERVICES;
var port = process.env.PORT || 3030;
var conn_str = 'mongodb://localhost/notifycar-api';

if(mongo) {
  var env = JSON.parse(mongo);
  if(env['mongodb']) {
    mongo = env['mongodb'][0]['credentials'];
    if(mongo.url) {
      conn_str = mongo.url;
    } else {
      console.log("No mongo found");
    } 
  }
}

module.exports = conn_str;