var env = require('dotenv').config();
var apiPath = process.env.API_PATH;
var requestify = require('requestify');

var ids = [];
requestify.get(apiPath + '/fabricante').then(function(response){ 
  for(var i =0; i < response.getBody().length; i++){
    ids[i] = response.getBody()[i]._id;
  }
  
  for(var x = 0; x < ids.length; x++){  
    requestify.delete(apiPath + '/fabricante/' + ids[x]).then(function(response){});
  }
});