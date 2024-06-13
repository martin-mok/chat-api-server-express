import { validate } from '../../middlewares/validate.middleware';
import { groupController, GroupController } from './group.controller';
import { Router } from 'express';
import { JoinGroupRequestSchema } from './validationSchemas/group.request.schemas';

class GroupRouter {
  private router: Router = Router();

  constructor(private controller: GroupController) {
    this.initRoutes();
  }

  initRoutes = () => {
    this.router.route('/').get(this.controller.getAll);
    this.router
      .route('/join')
      .post(validate(JoinGroupRequestSchema), this.controller.joinGroup);
    this.router.route('/:id').get(this.controller.findById);
  };

  getRouter = () => {
    return this.router;
  };
}

export const groupRouter = new GroupRouter(groupController);
