var mongoose = require("mongoose");
var userValidator = require("./userValidator.js");

mongoose.Promise = global.Promise;

module.exports = {
  secured: (req, res, next) => {
    // function used as middleware for all secured requests
    // returning the currently logged in username passed into
    // res.locals.user

    if (req.body.token) {
      userValidator.validateToken(req.body.token)
      .then( (response) => {
        // validated, set authenticated user
        res.locals.username = tokenData.username;
        next();
      }, (error) => {
        res.status(400);
        res.json({
          success: false,
          error: "invalid token"
        });
      });
    }
  },
  securedAdmin: (req, res, next) => {
    // function used as middleware for admin-restricted requests
    // replaces secured function

    if (req.body.adminToken) {
      userValidator.validateToken(req.body.adminToken, (err, tokenData) => {
        if (err) {
          console.error(err);
          res.status(404);
          res.json({
            success: false,
            error: "invalid token"
          });
        } else {
          // validated, set authenticated user

          mongoose.model("AdminUser").findById(tokenData.username, (err, document) => {
            if (err) {
              console.error(err);
            } else {

              if (document) {

                res.locals.adminUser = tokenData.username;

                next();

              } else {
                console.log("no document");
                res.status(404);
                res.json({
                  success: false,
                  error: "unauthenticated user"
                })
              }
            }
          });
        }
      });

    } else {
      console.log('token not supplied');
      res.status(404);
      reses.json({
        success: false,
        error: "admin token not supplied"
      });
    }
  },

  // put user object in res.locals:
  // if logged in: token = { auth: true, data: [data] }
  // if not logged in or bad token: token = { auth: false, error: [string]}
  getToken: (req, res, next) => {
    // console.log('poop');
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    // console.log(token)
    if (token) {
      userValidator.validateToken(token)
      .then((result) => {
        res.locals.token = {
          auth: true,
          data: result
        }
      }, (error) => {
        // console.log('poop');
        res.locals.token = {
          auth: false,
          error: error
        };
      }).then((result) => {
        next();
      })
    } else {
      res.locals.token = {
        auth: false,
        error: "token doesn't exist"
      };
      next();
    }
  },

  // put admin user object in res.locals:
  // if logged in: adminToken = { auth: true, data: [data] }
  // if not logged in or bad token: token = { auth: false, error: [string] }
  getAdminToken: (req, res, next) => {
    let adminToken = req.body.adminToken || req.query.adminToken || req.headers['admin-token']; // admin-token is not a standard header
    if (adminToken) {
      userValidator.validateToken(adminToken)
      .then((result) => {
        res.locals.adminToken = {
          auth: true,
          data: result
        };
      }, (error) => {
        res.locals.adminToken = {
          auth: false,
          error: error
        };
      }).then((result) => {
        next();
      })
    } else {
      res.locals.adminToken = {
        auth: false,
        error: "admin token doesn't exist"
      };
      next();
    }
  }
}
