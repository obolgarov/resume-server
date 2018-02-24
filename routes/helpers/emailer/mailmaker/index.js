const fs = require('fs');

// fs.readdirSync reads from the server's working directory (server.js)
const templatesPath = './routes/helpers/emailer/mailmaker/templates';

let templates = {};

// everything here has to be synchronous and done before the server finishes
// starting

// TODO: add asynchronous promise support for server starting, allowing this
// process to be within more prettier promises

// TODO: possibly put this in an 'init' function to make it more easily testable



// email templates include a subject, html, and text file under those names
// which can include handlebars syntax for dynamic data.
fs.readdirSync(templatesPath)
.forEach((templateName) => {
  let templateObj = {
    html: null,
    text: null,
    subject: null
  }

  fs.readdirSync(templatesPath + '/' + templateName)
  .forEach((templateFile) => {
    if (!Object.keys(templateObj).includes(templateFile)) {
      return;
    }

    let data = fs.readFileSync(templatesPath + '/' + templateName + '/' + templateFile);
    // console.log(data);
    templateObj[templateFile] = data.toString('utf8');
  });

  templates[templateName] = templateObj;
});

module.exports = {
  getTemplate (templateName) {
    return new Promise((resolve, reject) => {
      if (templates[templateName]) {
        resolve(templates[templateName]);
      } else {
        reject('not found')
      }
    })
  }
}
