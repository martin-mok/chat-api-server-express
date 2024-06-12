import { messageController, MessageController } from './message.controller';
import { Router } from 'express';

class MessageRouter {
  private router: Router = Router();

  constructor(private controller: MessageController) {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.route('/').get(this.controller.getAll);
    this.router.route('/:id').get(this.controller.findById);
  };

  getRouter = () => {
    return this.router;
  };
}

export const messageRouter = new MessageRouter(messageController);
