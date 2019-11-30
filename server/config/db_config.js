const { Pool } = require('pg');

const connection = new Pool({
  connectionString: "postgres://nwzcvpkv:lW1tZITjZJkmK9bT8jiQhT4eo6aXRd08@isilo.db.elephantsql.com:5432/nwzcvpkv",
  idleTimeoutMillis: 30000,
})

module.exports = connection;