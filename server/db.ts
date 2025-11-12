import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

// `pg` exports its API as a default export in some ESM builds, so access Pool
// via the default import to remain compatible across environments.
const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  // intenta construir DATABASE_URL a partir de variables PG* si no está definida
  const host = process.env.PGHOST || 'localhost';
  const port = process.env.PGPORT || '5432';
  const user = process.env.PGUSER || process.env.PGUSER || 'postgres';
  const password = process.env.PGPASSWORD || process.env.PGPASSWORD || '';
  const database = process.env.PGDATABASE || process.env.PGDATABASE || 'traductor_embera';

  if (!process.env.DATABASE_URL && (!user || !database)) {
    throw new Error(
      'DATABASE_URL must be set or provide PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE',
    );
  }

  process.env.DATABASE_URL =
    process.env.DATABASE_URL ||
    `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(database)}`;
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
