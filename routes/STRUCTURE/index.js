var express = require('express');
var bodyParser = require('body-parser');
var getToken = require('../helpers/securedFunctions.js').getToken;
var routeControls = require('./routeControls.js');
var multer = require('multer'); // for file uploads

var app = express();
var router = express.Router();
router.use(bodyParser.json({extended: true}));
router.use(getToken);

var upload = multer({
  storage: STORAGEENGINE // change to required storage engine
})

// -------------- ROUTE FUNCTIONALITY GOES HERE: ----------------

router.route('/')
.get(routeControls.getAll)
.post(routeControls.createOne);

router.route('/upload')
.post(upload.single('file'), routeControls.upload);

router.route('/:id')
.get(routeControls.getOne)
.put(routeControls.updateOne)
.delete(routeControls.deleteOne);

// ------------------- END OF ROUTES ---------------------

module.exports = router;
