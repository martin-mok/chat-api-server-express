import { Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import { userService, UserService } from './user.service';

export class UserController implements Controller {
  constructor(private userService: UserService) {}

  getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const userId = request?.params?.userId;
    if (!userId) {
      return;
    }
    const user = await this.userService.findById(userId);
    if (user) {
      response.json(user);
    } else {
      next(new UserNotFoundException(userId));
    }
  };

  getAllUsers = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const users = await this.userService.getAllUsers();
    response.json({ users });
  };
}

export const userController = new UserController(userService);
