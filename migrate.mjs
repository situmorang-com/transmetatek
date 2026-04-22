// Runs Drizzle migrations at server startup
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const dbPath = process.env.DB_PATH ?? './data/applications.db';

// Ensure the directory exists
mkdirSync(dirname(dbPath), { recursive: true });

const client = createClient({ url: `file:${dbPath}` });
const db = drizzle(client);

await migrate(db, { migrationsFolder: './drizzle' });
console.log('[db] Migrations applied ✓');

client.close();
