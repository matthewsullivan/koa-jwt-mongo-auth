const MongoClient = require('mongodb').MongoClient;

const path = require('path');

const config = require(path.resolve('./config/env/default'));
const url = `mongodb://${config.db.host}:${config.db.port}`;

let client;
let database;

const close = () => {
  client.close();
};

const connect = async () => {
  const options = {useUnifiedTopology: true};

  client = await MongoClient.connect(url, options);

  database = client.db(config.db.database);
};

const db = () => {
  return database;
};

module.exports = {
  close,
  connect,
  db,
};
