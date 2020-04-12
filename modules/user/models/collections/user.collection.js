db.user.drop();

db.createCollection('user', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        email: {
          bsonType: 'string',
          description: 'Must provide a valid email',
          pattern: '@mongodb.com$',
        },
        firstName: {
          bsonType: 'string',
          description: 'Must provide a first name',
        },
        lastName: {
          bsonType: 'string',
          description: 'Must provide a last name',
        },
        password: {
          bsonType: 'string',
          description: 'Must provide a password',
        },
      },
      required: ['email', 'firstName', 'lastName', 'password'],
    },
  },
});
