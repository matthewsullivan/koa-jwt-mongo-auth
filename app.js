const Koa = require('koa');

const app = new Koa();

const body = require('koa-body');
const glob = require('glob');
const helmet = require('koa-helmet');
const passport = require('koa-passport');
const path = require('path');

const config = require(path.resolve('./config/env/default'));
const mongo = require(path.resolve('./config/lib/mongo/mongo'));

app.use(body()).use(passport.initialize());
app.use(helmet());

glob.sync('./modules/*/routes/*.js').forEach((file) => {
  const routes = require(path.resolve(file)).routes();

  app.use(routes);
});

app.keys = ['koa-jwt-postgres-auth'];
app.proxy = true;

app.listen(config.server.port, async () => {
  const connection = await mongo.connect();

  console.log(`Store: \t\t ${connection.s.url}`);
  console.log(`\n${new Date().toString()}`);
});

console.log('\nKoa, JWT, and Mongo Authentication API\n');
console.log(`Environment: \t ${process.env.NODE_ENV}`);
console.log(`Port: \t\t ${config.server.port}`);

module.exports = app;
