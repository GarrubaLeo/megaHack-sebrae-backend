// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',

    connection: {
      host: process.env.PG_DB_HOST,
      user: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASSWORD,
      database: process.env.PG_DB_NAME,
    },

    migrations: {
      directory: './src/database/migrations'
    },

  },

};
