var User = require("../../models/User.js");


module.exports = (username) => {
  return new Promise( (resolve, reject) => {

    // console.log(username);

    User.findById(username, (err, document) => {
      if (err) {
        reject(err)
      } else {
        if (document) {
          resolve (document.city);
        } else {
          reject("No user found");
        }
      }
    });
  })
}
