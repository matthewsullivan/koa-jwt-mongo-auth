const path = require('path');

const controller = require(path.resolve(
  './modules/user/controllers/user.controller.js'
));

const mongo = require(path.resolve('./config/lib/mongo/mongo'));

const seed = (() => {
  /**
   * Init
   * @async
   */
  const init = async () => {
    const connection = await mongo.connect();

    console.log(connection);

    await registerUser();

    connection.close();
  };

  /**
   * Register User
   * @async
   */
  const registerUser = async () => {
    console.log(`registerUser [${new Date().toString()}]`);

    const ctx = {
      request: {
        body: {},
      },
    };

    const user = {
      email: 'johndoe@localhost.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '(a1B2c3D4e5F6g)',
    };

    ctx.request.body = user;

    await controller.registerUser(ctx);
  };

  return {
    init: init,
  };
})();

seed.init().then(process.exit);
