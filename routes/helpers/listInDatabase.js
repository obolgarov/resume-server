var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// I decided to return promises instead of callbacks for this function because
// often I required this function multiple times and potentially required
// numerous callbacks, and decided I needed to finally learn how to use promises
// instead of reverting back to the async library
module.exports = {
  find: (list, modelName, field) => {

    return new Promise( (resolve, reject) => {

      mongoose.model(modelName).find({[field]: { $in: list }}, (err, documents) => {
        if (err) {
          console.error(err);
        } else {
          let errorItem = null;

          list.forEach( (item) => {
            if ( !documents.find( (document) => { return document._id == item; }) ) {
              reject({item: item, modelName: modelName});
            }
          });

          // resolve only called if reject hasn't yet (ie. all items in list are valid)

          // return value is empty, the only info needed is if this function
          // is successful, which when resolved is self-evident
          resolve();

        }
      })

    })
  }
}
