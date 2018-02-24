var mongoose = require('mongoose');
var config = require('./config');

var db = {
  state: {
    db: null
  },
  connect: function(url, callback) {
    if (this.state.db) {
      return callback();
    }

    mongoose.Promise = global.Promise;

    mongoose.connect(url, {
      useMongoClient: true
    },
    function(err) {
      if (err) {
        console.log("couldn't connect to database");
        return callback(err);
      }

      console.log("connected to database");
      callback();
    });

    if (mongoose.connection){
      this.state.db = mongoose.connection;
    }
  },
  get: function() {
    return this.state.db
  },
  close: function() {
    if (this.state.db){
      this.state.db.close(function(err, result) {
        this.state.db = null;
        this.state.mode = null;
        callback(err);
      });
    }
  }
}

module.exports = db;
