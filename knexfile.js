// Update with your config settings.
require('dotenv').config();
const keys = require('./config/keys.js');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      database: 'postgres',
      user:     'postgres',
      password: keys.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    }
  },
};
