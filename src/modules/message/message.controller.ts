import { NextFunction, Request, Response } from 'express';
import { GroupNotFoundException } from '../../exceptions/HttpExceptions';
import Controller from '../../interfaces/controller.interface';
import { messageService, MessageService } from './message.service';

export class MessageController implements Controller {
  constructor(private messageService: MessageService) {}

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
      const group = await this.messageService.findById(id);
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
      // if no request query params, return all
      if (Object.keys(request.query).length === 0) {
        const groups = await this.messageService.getAll();
        return response.json({ groups });
      }
      // filter by request query params
      const groups = await this.messageService.filterBy();
      return response.json({ groups });
    } catch (error) {
      return next(error);
    }
  };
}

export const messageController = new MessageController(messageService);
