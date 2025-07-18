import { messageController, MessageController } from './message.controller';
import { Router } from 'express';
import { FindMessagesRequestSchema } from './validationSchemas/message.request.schemas';
import { validate } from '../../middlewares/validate.middleware';

class MessageRouter {
  private readonly router: Router = Router();

  constructor(private readonly controller: MessageController) {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router
      .route('/')
      .get(validate(FindMessagesRequestSchema), this.controller.getAll);
    this.router.route('/').post(this.controller.send);
    this.router.route('/:id').get(this.controller.findById);
  };

  getRouter = () => {
    return this.router;
  };
}

export const messageRouter = new MessageRouter(messageController);
