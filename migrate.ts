import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './src/utils/db';

async function migrateScript() {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, {
    migrationsFolder: './migrations',
    migrationsTable: 'migration',
    migrationsSchema: 'migration',
  });

  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}

migrateScript();
