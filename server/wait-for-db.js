#!/usr/bin/env node
// Wait for database to be ready by attempting to connect using 'pg'.
// Exits 0 when DB is reachable, non-zero after timeout.

const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
const MAX_RETRIES = parseInt(process.env.DB_WAIT_RETRIES || '30', 10); // total attempts
const RETRY_DELAY_MS = parseInt(process.env.DB_WAIT_DELAY_MS || '2000', 10);

if (!DATABASE_URL) {
  console.error('wait-for-db: DATABASE_URL is not set');
  process.exit(1);
}

async function waitForDb() {
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    attempt += 1;
    try {
      const pool = new Pool({ connectionString: DATABASE_URL });
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      await pool.end();
      console.log(`wait-for-db: database is ready (connected on attempt ${attempt})`);
      return 0;
    } catch (err) {
      console.log(`wait-for-db: attempt ${attempt} failed: ${err.message || err}`);
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }

  console.error(`wait-for-db: timed out after ${MAX_RETRIES} attempts`);
  return 2;
}

waitForDb().then((code) => process.exit(code)).catch((e) => {
  console.error('wait-for-db: unexpected error', e);
  process.exit(3);
});
