import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const dbPath = process.env.DB_PATH ?? './data/applications.db';

const client = createClient({ url: `file:${dbPath}` });

export const db = drizzle(client, { schema });
