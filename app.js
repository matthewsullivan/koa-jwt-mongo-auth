const Koa = require('koa');

const app = new Koa();

const body = require('koa-body');
const glob = require('glob');
const helmet = require('koa-helmet');
const passport = require('koa-passport');
const path = require('path');

const config = require(path.resolve('./config/env/default'));

app.use(body()).use(passport.initialize());
app.use(helmet());

glob.sync('./modules/*/routes/*.js').forEach((file) => {
  const routes = require(path.resolve(file)).routes();

  app.use(routes);
});

app.keys = ['koa-jwt-postgres-auth'];
app.proxy = true;

app.listen(config.server.port);

console.log('\nKoa, JWT, and Postgres Authentication API\n');
console.log(`Environment: \t ${process.env.NODE_ENV}`);
console.log(`Port: \t\t ${config.server.port}`);
console.log(`\n${new Date().toString()}\n`);

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});

module.exports = app;
