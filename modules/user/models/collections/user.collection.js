db.user.drop();

db.createCollection('user', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        email: {
          bsonType: 'string',
        },
        firstName: {
          bsonType: 'string',
        },
        lastName: {
          bsonType: 'string',
        },
        password: {
          bsonType: 'string',
        },
        created: {
          bsonType: 'date',
        },
        updated: {
          bsonType: 'date',
        },
      },
      required: [
        'email',
        'firstName',
        'lastName',
        'password',
        'created',
        'updated',
      ],
    },
  },
});
