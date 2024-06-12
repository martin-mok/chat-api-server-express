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
      const groups = await this.messageService.getAll();
      response.json({ groups });
    } catch (error) {
      return next(error);
    }
  };
}

export const messageController = new MessageController(messageService);
