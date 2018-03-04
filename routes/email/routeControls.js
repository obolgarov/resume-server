let axios = require('axios');
let config = require('../../config')();
let nodemailer = require('nodemailer');

module.exports = {
  sendEmail (req, res) {
    // console.log(req.body);

    // console.log(config.recaptchaSecret);

    // check captcha challenge
    let ip = (process.env.NODE_ENV == 'PRODUCTION') ? req.ip : '172.97.209.176'

    let path = 'https://www.google.com/recaptcha/api/siteverify';
    path += '?secret=' + config.recaptchaSecret;
    path += '&response=' + req.body.recaptchaChallenge;
    path += '&remoteip=' + ip;

    axios.post(path,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then((result) => {
      if (result.data.success) {
        let mailOptions = {
          from: config.emailAccount,
          to: config.emailAccount,
          subject: 'Resume Website Message From: ' + req.body.name,
          text: 'from: ' + req.body.name + '\nemail: ' + req.body.email + '\nmessage: ' + req.body.message,
          html: '<p>from: ' + req.body.name + '</p><p>email: ' + req.body.email + '</p><p>message: ' + req.body.message +'</p>'
        };

        nodemailer.createTransport({
          host: config.emailHost,
          port: config.emailHostPort,
          secure: config.emailHostSecure,
          auth: {
            user: config.emailAccount,
            pass: config.emailPass
          }
        }).sendMail(mailOptions, (error, info) => {
          if (error) {
            return Promise.reject(error);
          }
          return 'Message sent';
        });
      }
    }).then((result) => {
      res.status(200);
      res.json({
        success: true
      });
    }).catch((error) => {
      // invalid captcha
      res.status(400);
      res.json({
        success: false,
        error: error
      });
    })
  },

  testConnection (req, res) {
    console.log('connection test');
    res.status(200);
    res.json({
      success: true
    })
  }
}
