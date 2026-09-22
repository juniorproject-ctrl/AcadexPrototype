import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from '../db';

async function migrate() {
  const migrationPath = path.resolve(process.cwd(), 'server/migrations/001_initial.sql');
  const sql = await fs.readFile(migrationPath, 'utf8');
  const connection = await pool.getConnection();
  try {
    for (const statement of sql.split(/;\s*(?:\r?\n|$)/).map((part) => part.trim()).filter(Boolean)) {
      await connection.query(statement);
    }
    console.log('Database migration completed.');
  } finally {
    connection.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error('Migration failed:', error.message);
  process.exit(1);
});
