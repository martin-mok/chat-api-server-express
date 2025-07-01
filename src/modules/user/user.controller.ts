import { NextFunction, Request, Response } from 'express';
import { userService, UserService } from './user.service';
import {
  NotAuthorizedException,
  UserNotFoundException,
} from '../../exceptions/HttpExceptions';

export class UserController {
  constructor(private readonly userService: UserService) {}

  findById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      // demo for blocking unautherized user, e.g. only admin can view all users.
      if (request.user?.id != '1') {
        return next(new NotAuthorizedException());
      }
      const users = await this.userService.getAll();
      response.json({ users });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
