import express, { Router } from 'express';
import { errorMiddleware } from './middlewares/error.middleware';

class App {
  private app: express.Application;

  constructor(router: express.Router) {
    this.app = express();

    this.addMiddlewares();
    this.addRouter(router);
    this.addErrorPage();
    this.addErrorHandler();
  }

  public getServer() {
    return this.app;
  }

  private addMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private addErrorHandler() {
    this.app.use(errorMiddleware);
  }

  private addErrorPage() {
    this.app.all('*', (req, res) => {
      res.status(404).send('<h1>404! Page not found</h1>');
    });
  }

  private addRouter(router: Router) {
    this.app.use(router);
  }
}

export default App;
