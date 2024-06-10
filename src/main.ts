import App from './app';
import router from './routers';
import env from './config/config';
import { User } from './user/user.interface';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

function main() {
  const app = new App(router);
  const server = app.getServer();
  server.listen(env.port, () => {
    console.log(`Listening to port ${env.port}`);
  });
}

main();
