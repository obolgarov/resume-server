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

    console.log(path);
    axios.post(path,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      }
    }).then((result) => {
      if (result.data.success) {
        // valid captcha, proceed with mail
        nodemailer.createTestAccount((err, account) => {
          let mailOptions = {
            from: 'oleksandr.career@bolgarov.org',
            to: 'oleksandr.career@bolgarov.org',
            subject: 'Website Message From: ' + req.body.name,
            text: req.body.name + '\n' + req.body.email + '\n' + req.body.message,
            html: '<p>' + req.body.name + '</p><p>' + req.body.email + '</p><p>' + req.body.message +'</p>'
          };

          nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: account.user,
              pass: account.pass
            }
          }).sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('sent message');
          });
        });
      }
    }).catch((error) => {
      // console.log('error');
      // console.log(error.response);

      // invalid captcha, do nothing
    })
  }
}