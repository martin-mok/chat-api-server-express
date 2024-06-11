import { config } from 'dotenv';

config({ path: `.env` });

export const configuration = {
  port: process.env.PORT || 3200,
  dbUrl: process.env.DB_URL || '',
};
