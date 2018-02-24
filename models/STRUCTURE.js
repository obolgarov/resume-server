var db = require('../db.js');
var mongoose = require('mongoose')
var shortid = require('shortid');

var mongoCollection = "COLLECTION"; // change to required collection in database

// where mongoose is called, must change promises to global to avoid deprecation
mongoose.Promise = global.Promise;

var ObjectId = mongoose.Schema.ObjectId;

var schema = new mongoose.Schema( {
  _id: {type: String, default: shortid.generate}, // slug, randomly generated
  name: {type: String, required: true}
});

module.exports = mongoose.model(mongoCollection, schema);
