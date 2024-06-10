import { Router } from 'express';
import { userRouter } from '../user/user.router';

const router = Router();

const routesMap = [
  {
    path: '/users',
    route: userRouter.getRouter(),
  },
];

routesMap.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
