import { NextFunction, Request, Response } from 'express';
import {
  ERROR_CODE,
  GroupNotFoundException,
  HttpException,
  UserNotFoundException,
} from '../../exceptions/HttpExceptions';
import { groupService, GroupService } from './group.service';
import { userService, UserService } from '../user/user.service';
import { StatusCodes } from 'http-status-codes';

export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {}

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
      const group = await this.groupService.findById(id);
      if (!group) {
        return next(new GroupNotFoundException(id));
      }
      response.json(group);
    } catch (error) {
      return next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getAll();
      response.json({ groups });
    } catch (error) {
      return next(error);
    }
  };

  joinGroup = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = request.user?.id;
      if (!userId) {
        next(
          new HttpException(
            ERROR_CODE.USER_NOT_FOUND,
            StatusCodes.NOT_FOUND,
            'user id not found',
          ),
        );
        return;
      }
      const user = await this.userService.findById(userId);
      console.log('user: ', user);
      if (!user) {
        return next(new UserNotFoundException(userId));
      }
      await this.groupService.joinGroup({ userId, ...request.body });
      response.json({ success: true });
    } catch (error) {
      return next(error);
    }
  };
}

export const groupController = new GroupController(groupService, userService);
