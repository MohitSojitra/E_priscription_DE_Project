var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + "/public/index.htm")
});

module.exports = router;
