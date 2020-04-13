const argon2 = require('argon2');
const passport = require('koa-passport');
const path = require('path');

const LocalStrategy = require('passport-local').Strategy;

const service = require(path.resolve(
  './modules/authentication/services/authentication.service.js'
));

/**
 * Get User By Id
 * @async
 * @param {number} userId
 * @return {object}
 */
const getUserById = async (userId) => {
  const user = await service.getUserById(userId);

  return user;
};

/**
 * Validate
 * @async
 * @param {object} credentials
 * @return {boolean|object}
 */
const validate = async (credentials) => {
  const result = await service.getUserByEmail(credentials.email);

  if (!result) {
    return false;
  }

  const verified = await argon2.verify(result.password, credentials.password);

  return verified ? await getUserById(result._id) : false;
};

const options = {usernameField: 'email'};

/**
 * Use
 * @callback done
 * @param {object} options
 * @param {string} username
 * @param {string} password
 * @param {function} done
 * @return {object}
 */
passport.use(
  new LocalStrategy(options, async (username, password, done) => {
    const credentials = {
      email: username,
      password: password,
    };

    const user = await validate(credentials);

    return user ? done(null, user) : done('invalid', false);
  })
);
