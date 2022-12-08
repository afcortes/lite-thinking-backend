const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'andres',
    password: 'a1b2c3d4e5',
    database: 'my_store'
  })
  await client.connect();
  return client;
}

module.exports = getConnection;
