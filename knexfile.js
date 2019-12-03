// Update with your config settings.
require('dotenv').config({path: './'});

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASS,
      database: process.env.PGDB,
      port: process.env.PGPORT
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
