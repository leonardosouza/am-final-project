var env = require('dotenv').config();
var apiPath = process.env.API_PATH;
var requestify = require('requestify');
var ids = [];

requestify.get(apiPath +'/modelo').then(function (resp) {
  for(var i = 0; i < resp.getBody().length; i++){
    ids[i] =resp.getBody()[i]._id;
  }

  console.log(ids);
  
  for(var x = 0; x < ids.length; x++){  
    requestify.delete(apiPath +'/modelo/' + ids[x]).then(function(response){});
  }
});