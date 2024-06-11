import { NextFunction, Request, Response } from 'express';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import UserNotFoundException from '../../exceptions/UserNotFoundException';
import Controller from '../../interfaces/controller.interface';
import { userService, UserService } from './user.service';

export class UserController implements Controller {
  constructor(private userService: UserService) {}

  findById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const id = request?.params?.id;
    if (!id) {
      return;
    }
    // demo for blocking unautherized user
    const tokenUserId = request.user?.id;
    if (tokenUserId != id) {
      return next(new NotAuthorizedException());
    }
    const user = await this.userService.findById(id);
    if (user) {
      response.json(user);
    } else {
      return next(new UserNotFoundException(id));
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    // demo for blocking unautherized user, e.g. only admin can view all users.
    if (request.user?.id != '1') {
      return next(new NotAuthorizedException());
    }
    const users = await this.userService.getAll();
    response.json({ users });
  };
}

export const userController = new UserController(userService);
