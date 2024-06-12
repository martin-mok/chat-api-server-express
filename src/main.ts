import App from './app';
import router from './routers';
import { configuration } from './config/config';
import { connection } from './utils/db';

declare module 'express' {
  export interface Request {
    user?: { id: string };
  }
}

async function main() {
  // check db connection
  await connection`SELECT 'testing'`;

  const app = new App(router);
  const server = app.getServer();
  server.listen(configuration.port, () => {
    console.log(`server listening to port ${configuration.port}`);
  });
}

main();
