import App from './app';
import router from './routers';
import env from './config/config';

function main() {
  const app = new App(router);
  const server = app.getServer();
  server.listen(env.port, () => {
    console.log(`Listening to port ${env.port}`);
  });
}

main();
