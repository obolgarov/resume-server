const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const mailmaker = require('./mailmaker');

// TODO: find best practice for implementing this in configs
const host = 'smtp.ethereal.email';
const port = 587;
const user = 'lblqsmntwqyx75zm@ethereal.email';
const pass = 'KrdUmJvqHyMeyv6Pm7';

const fromAddress = '"Testy Testerson" <testy@testerson.org>';

const templatesDir = './routes/helpers/emailer/templates';

// TODO: translate everything into a email-templates based approach,
// use ejs instead of {{}}

module.exports = {
  transporter: nodemailer.createTransport({
    host: host,
    port: port,
    secure: false,
    auth: {
      user: user,
      pass: pass
    }
  }),

  sendUserMail (userEmail, proposalObj) {
    return new Promise((resolve, reject) => {
      let templateName = 'userConfirmationEmail';
      let templateVars = {
        userEmail: proposalObj.workEmail
      }

      this.sendMail(userEmail, templateName, templateVars)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  sendAdminMail (userEmail, proposalObj) {
    return new Promise((resolve, reject) => {
      let templateName = 'adminConfirmationEmail';
      let templateVars = {
        userEmail: userEmail,
        proposalId: proposalObj._id
      };

      this.sendMail(userEmail, templateName, templateVars)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },

  sendMail (toAddress, templateName, templateOptions) {
    return new Promise((resolve, reject) => {
      mailmaker.getTemplate(templateName)
      .then((template) => {
        let mailOptions = {
          from: fromAddress,
          to: toAddress,
          subject: handlebars.compile(template.subject)(templateOptions),
          html: handlebars.compile(template.html)(templateOptions),
          text: handlebars.compile(template.text)(templateOptions)
        };

        this.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        })
      })
      .catch((error) => {
        reject(error);
      });
    })
  }
}
