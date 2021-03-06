const path = require('path');

const mongo = require(path.resolve('./config/lib/mongo/mongo'));

const ObjectId = require('mongodb').ObjectID;

module.exports = {
  /**
   * Get User By Email
   * @param {string} email
   * @return {object}
   */
  getUserByEmail: (email) => {
    const collection = mongo.db().collection('user');
    const statement = collection.findOne({email: email});

    return statement;
  },

  /**
   * Get User By Id
   * @param {number} userId
   * @return {object}
   */
  getUserById: (userId) => {
    const collection = mongo.db().collection('user');
    const statement = collection.findOne({_id: userId});

    return statement;
  },

  /**
   * Update Password
   * @param {object} user
   * @return {object}
   */
  updatePassword: (user) => {
    const collection = mongo.db().collection('user');

    const statement = collection.findOneAndUpdate(
      {
        _id: ObjectId(user.id),
      },
      {
        $set: {
          password: user.password,
          updated: new Date(),
        },
      }
    );

    return statement;
  },

  /**
   * Update Profile
   * @param {object} user
   * @return {object}
   */
  updateProfile: (user) => {
    const collection = mongo.db().collection('user');

    const statement = collection.findOneAndUpdate(
      {
        _id: ObjectId(user.id),
      },
      {
        $set: {
          email: user.email.toLowerCase(),
          firstName: user.firstName,
          lastName: user.lastName,
          updated: new Date(),
        },
      },
      {
        returnOriginal: false,
      }
    );

    return statement;
  },

  /**
   * Register User
   * @param {object} user
   * @return {object}
   */
  registerUser: (user) => {
    const collection = mongo.db().collection('user');

    const statement = collection.insertOne({
      email: user.email.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      created: new Date(),
      updated: new Date(),
    });

    return statement;
  },
};
