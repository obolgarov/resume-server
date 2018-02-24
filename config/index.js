let secrets = require('../secrets');

let config = {
  local: {
    mode: 'local',
    httpPort: 8080,
    httpsPort: 8443,
    connstr: 'mongodb://localhost:27017/resume_dev',
    email: 'oleksandr.career@bolgarov.org',
    recaptchaSecret: secrets.recaptchaSecret,
    secret: secrets.secret
  },
  staging: {
    mode: 'staging',
    httpPort: 8080,
    httpsPort: 8443,
    connstr: 'mongodb://localhost:27017/resume_staging',
    email: 'oleksandr.career@bolgarov.org',
    recaptchaSecret: secrets.recaptchaSecret,
    secret: secrets.secret
  },
  production: {
    mode: 'production',
    httpPort: 8080,
    httpsPort: 8443,
    connstr: 'mongodb://localhost:27017/resume_prod',
    email: 'oleksandr.career@bolgarov.org',
    recaptchaSecret: secrets.recaptchaSecret,
    secret: secrets.secret
  }
}

module.exports = function(mode) {
  return config[ mode || process.argv[2] || 'local' ] || config.local;
}
