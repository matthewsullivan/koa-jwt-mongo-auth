const process = require('process');

const config = {
  expiration: process.env.JWT_EXPIRATION || '1h',
  secret: process.env.JWT_SECRET || 'jwt-secret',
  server: {
    port: process.env.PORT || 3000,
  },
};

module.exports = config;
