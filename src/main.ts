import App from './app';
import router from './routers';
import env from './config/config';

declare module 'express' {
  export interface Request {
    user?: { id: string };
  }
}

function main() {
  const app = new App(router);
  const server = app.getServer();
  server.listen(env.port, () => {
    console.log(`server listening to port ${env.port}`);
  });
}

main();
