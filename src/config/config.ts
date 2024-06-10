import { config } from 'dotenv';

config({ path: `.env` });

const env = {
  port: process.env.PORT || 3200,
};

export default env;
