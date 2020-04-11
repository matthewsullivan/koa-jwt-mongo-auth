const path = require('path');

const client = require('mongodb').MongoClient;
const config = require(path.resolve('./config/env/default'));
const url = `mongodb://127.0.0.1:27017/${config.db.database}`;

let mongodb;

const close = () => {
  mongodb.close();
};

const connect = (callback) => {
  client.connect(url, (err, db) => {
    mongodb = db;
    callback();
  });
};

const get = () => {
  return mongodb;
};

module.exports = {
  close,
  connect,
  get,
};
