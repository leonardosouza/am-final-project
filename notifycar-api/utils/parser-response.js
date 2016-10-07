var parser = {
  success: function(res, statusCode, post) {
    try {
      res.status(statusCode).json(post);
    } catch(e) {
      console.log('PARSE SUCCESS ERROR ==>', e);
    }
  },
  notFound: function(res, statusCode, post, msgError) {
    try {
      if (post === null || post.length == 0) res.status(statusCode).json(msgError);
    } catch(e) {
      console.log('PARSE NOT FOUND ERROR ==>', e);
    }
  },
  error: function(res, statusCode, err) {
    try {
      if (err) return res.status(statusCode).json(err);
    } catch(e) {
      console.log('PARSE ERROR ==>', e);
    }
  }
}

module.exports = parser;