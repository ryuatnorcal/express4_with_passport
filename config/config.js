var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3000,
    db: 'mongodb://localhost/passport-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3000,
    db: 'mongodb://localhost/passport-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'passport'
    },
    port: 3000,
    db: 'mongodb://localhost/passport-production'
  }
};

module.exports = config[env];
