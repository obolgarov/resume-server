
var express = require ('express');
var router = express.Router();

// global router allows cors for all requests
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

module.exports = router;
