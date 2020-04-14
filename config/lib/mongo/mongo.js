const MongoClient = require('mongodb').MongoClient;

const path = require('path');

const config = require(path.resolve('./config/env/default'));
const url = `mongodb://${config.db.host}:${config.db.port}`;

let database;

const connect = async () => {
  const client = await MongoClient.connect(url, {useUnifiedTopology: true});

  database = client.db(config.db.database);

  return client;
};

const db = () => {
  return database;
};

module.exports = {
  connect,
  db,
};
