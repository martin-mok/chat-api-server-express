import { NextFunction, Request, Response } from 'express';
import { GroupNotFoundException } from '../../exceptions/HttpExceptions';
import Controller from '../../interfaces/controller.interface';
import { groupService, GroupService } from './group.service';

export class GroupController implements Controller {
  constructor(private groupService: GroupService) {}

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
      const groups = await this.groupService.joinGroup(request.body);
      response.json({ groups });
    } catch (error) {
      return next(error);
    }
  };
}

export const groupController = new GroupController(groupService);
