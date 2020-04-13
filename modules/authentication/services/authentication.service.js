const path = require('path');

const ObjectId = require('mongodb').ObjectID;
const mongo = require(path.resolve('./config/lib/mongo/mongo'));

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
    const statement = collection.findOne({_id: ObjectId(userId)});

    return statement;
  },
};
