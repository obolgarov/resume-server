let secrets = require('../secrets');

let config = {
  local: {
    mode: 'local',
    httpPort: 8080,
    httpsPort: 8443,
    connstr: 'mongodb://localhost:27017/resume_dev',
    emailHost: 'box5486.bluehost.com',
    emailHostPort: 465,
    emailHostSecure: true,
    emailAccount: 'oleksandr.career@bolgarov.org',
    emailPass: secrets.emailPass,
    recaptchaSecret: secrets.recaptchaSecret,
    secret: secrets.secret
  },
  staging: {
    mode: 'staging',
    httpPort: 8080,
    httpsPort: 8443,
    connstr: 'mongodb://localhost:27017/resume_staging',
    emailHost: 'box5486.bluehost.com',
    emailHostPort: 465,
    emailHostSecure: true,
    emailAccount: 'oleksandr.career@bolgarov.org',
    emailPass: secrets.emailPass,
    recaptchaSecret: secrets.recaptchaSecret,
    secret: secrets.secret
  },
  production: {
    mode: 'production',
    httpPort: 8080,
    httpsPort: 8443,
    connstr: 'mongodb://localhost:27017/resume_prod',
    emailHost: 'box5486.bluehost.com',
    emailHostPort: 465,
    emailHostSecure: true,
    emailAccount: 'oleksandr.career@bolgarov.org',
    emailPass: secrets.emailPass,
    recaptchaSecret: secrets.recaptchaSecret,
    secret: secrets.secret
  }
}

module.exports = function(mode) {
  return config[ mode || process.argv[2] || 'local' ] || config.local;
}
