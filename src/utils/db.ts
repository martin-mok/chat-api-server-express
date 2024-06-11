import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schemas';
import { configuration } from '../config/config';

export const connection = postgres(configuration.dbUrl);

export const db = drizzle(connection, { schema });
