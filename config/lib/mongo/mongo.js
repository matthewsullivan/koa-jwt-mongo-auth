const path = require('path');

const client = require('mongodb').MongoClient;
const config = require(path.resolve('./config/env/default'));
const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;

let database;

const connect = (callback) => {
  const options = {useUnifiedTopology: true};

  client.connect(url, options, (err, db) => {
    database = db;
    callback();
  });
};

module.exports = {
  connect,
  database,
};
