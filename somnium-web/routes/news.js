var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendfile('./views/news.html');
});

module.exports = router;
