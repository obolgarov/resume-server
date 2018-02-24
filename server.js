let http = require('http');
let express = require ('express');
// let db = require('./db.js');
let config = require('./config')();

let app = express();

// middleware
//app.use(express.static(__dirname + '/public'));
app.use('/*', function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next();
});

// routes
app.use('/', require('./routes'));
app.use('/email', require('./routes/email'));

// start server
var httpServer = http.createServer(app);

// db.connect(config.connstr, function (err){
//   if(err){
//     console.error(err);
//   } else {
//
//     httpServer.listen(config.httpPort, function() {
//       console.log('http listening on port ' + config.httpPort + '...');
//     });
//
//   }
// });
httpServer.listen(config.httpPort, function() {
  console.log('http listening on port ' + config.httpPort + '...');
});

module.exports = app;
