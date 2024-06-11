import { groupController, GroupController } from './group.controller';
import { Router } from 'express';

class GroupRouter {
  private router: Router = Router();

  constructor(private controller: GroupController) {
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

export const groupRouter = new GroupRouter(groupController);
