var express = require('express');
var bodyParser = require('body-parser');
var getToken = require('../helpers/securedFunctions.js').getToken;
var routeControls = require('./routeControls.js');
var multer = require('multer'); // for file uploads

var app = express();
var router = express.Router();
router.use(bodyParser.json({extended: true}));
router.use(getToken);

// -------------- ROUTE FUNCTIONALITY GOES HERE: ----------------

router.route('/')
.post(routeControls.sendEmail);

router.route('/test')
.post(routeControls.testConnection);

// ------------------- END OF ROUTES ---------------------

module.exports = router;
