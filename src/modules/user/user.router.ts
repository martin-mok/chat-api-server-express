import { Router } from 'express';
import { userController, UserController } from './user.controller';

class UserRouter {
  private readonly router: Router = Router();

  constructor(private readonly controller: UserController) {
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

export const userRouter = new UserRouter(userController);
