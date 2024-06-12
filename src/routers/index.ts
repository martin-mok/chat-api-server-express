import { Router } from 'express';
import { groupRouter } from '../modules/group/group.router';
import { userRouter } from '../modules/user/user.router';
import { messageRouter } from '../modules/message/message.router';
const router = Router();

const routesMap = [
  {
    path: '/user',
    route: userRouter.getRouter(),
  },
  {
    path: '/group',
    route: groupRouter.getRouter(),
  },
  {
    path: '/message',
    route: messageRouter.getRouter(),
  },
];

routesMap.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
