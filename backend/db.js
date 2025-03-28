const { Pool } = require('pg');

// Create a connection pool to the PostgreSQL database
const pgPool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'chartmetric',
});

// Test the database connection
pgPool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Successfully connected to the database');
    release();
  }
});

/**
 * Execute a query on the database
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise} - Query result
 */
const query = async (text, params) => {
  const start = Date.now();
  console.log('start', start);
  try {
    const res = await pgPool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (err) {
    console.error('Error executing query', { text, err });
    throw err;
  }
};

/**
 *
 * Execute a ping query to check the database connection
 * @returns {Promise} - Query result
 */
const ping = async () => {
  try {
    const res = await pgPool.query('SELECT 1');
    return res;
  } catch (err) {
    console.error('Error pinging database', err);
    throw err;
  }
};

/**
 * Execute a transaction on the database
 * @param {Function} callback - Callback function that receives a client and runs queries
 * @returns {Promise} - Transaction result
 */
const transaction = async (callback) => {
  const client = await pgPool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  pgPool,
  query,
  ping,
  transaction,
};
