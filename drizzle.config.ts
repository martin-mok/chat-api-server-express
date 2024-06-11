import { defineConfig } from 'drizzle-kit';
import { configuration } from './src/config/config';
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schemas/*',
  out: './migrations',
  dbCredentials: { url: configuration.dbUrl },
});
