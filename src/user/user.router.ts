import { userController, UserController } from './user.controller';
import { Router } from 'express';

class UserRouter {
  private userRouter: Router = Router();

  constructor(private userController: UserController) {
    this.initRoutes();
  }

  initRoutes = () => {
    this.userRouter.route('/').get(this.userController.getAllUsers);
    this.userRouter.route('/:userId').get(this.userController.getUserById);
  };

  getRouter = () => {
    return this.userRouter;
  };
}

export const userRouter = new UserRouter(userController);
