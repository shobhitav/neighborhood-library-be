// Update with your config settings.
require('dotenv').config();

//change || statements and port before commit

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST || 'localhost',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASS,
      database: process.env.PGDB || 'postgres',
      //port: process.env.PGPORT
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
