var parser = {
  success: function(res, statusCode, post, msgError) {
    try {
      if (!post) {
        return res.status(400).json(msgError).end();
      } 
      return res.status(statusCode).json(post).end();
    } catch(e) {
      console.log('PARSE SUCCESS FAILED ==>', e);
    }
  },
  error: function(res, statusCode, err, next) {
    try {
      if (err) {
        return res.status(statusCode).json(err).end();
      }
    } catch(e) {
      console.log('PARSE ERROR FAILED ==>', e);
    }
  }
}

module.exports = parser;