const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_URL
});

pool.on('connect', () => {
    console.log('Banco de dados conectado');
})

module.exports = {
    query: (text, params) => pool.query(text, params),
};