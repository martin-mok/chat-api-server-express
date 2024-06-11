import { NextFunction, Request, Response } from 'express';
import GroupNotFoundException from '../../exceptions/GroupNotFoundException';
import Controller from '../../interfaces/controller.interface';
import { groupService, GroupService } from './group.service';

export class GroupController implements Controller {
  constructor(private groupService: GroupService) {}

  findById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const id = request?.params?.id;
    if (!id) {
      return;
    }
    const group = await this.groupService.findById(id);
    if (!group) {
      return next(new GroupNotFoundException(id));
    }
    response.json(group);
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    const groups = await this.groupService.getAll();
    response.json({ groups });
  };
}

export const groupController = new GroupController(groupService);
