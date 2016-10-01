var env = require('dotenv').config();
var apiPath = process.env.API_PATH;
var requestify = require('requestify');
var ids = [];

requestify.get(apiPath +'/modelo').then(function (resp) {
  
  resp.getBody().forEach(function(modelo) {
    ids.push(modelo._id);
  });

  var totalModelos = ids.length;

  var processDelete = setInterval(function() {
    if(totalModelos < 0) {
      clearInterval(processDelete);
      console.log('DONE!');
      return;
    } else {
      requestify.delete(apiPath +'/modelo/' + ids[totalModelos--]).then(function(response){
        console.log('===> DELETED', response.getBody());
      });  
    }
  }, 100);
});