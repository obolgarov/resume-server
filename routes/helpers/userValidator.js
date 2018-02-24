var jwt = require('jsonwebtoken');
var config = require('../../config')();


var userValidator = {

  // validateUser: function () {
  //
  //   //TODO: validate
  //
  //   return true;
  //
  // },

  validateToken: function(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    })
  },

  generateToken: function(payload) {
    return new Promise((resolve, reject) => {
      let options = {
        expiresIn: "24h",
        algorithm: "HS256"
      };

      jwt.sign(payload, config.secret, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    })
  },

}

module.exports = userValidator;
