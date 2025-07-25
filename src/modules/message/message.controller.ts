import { NextFunction, Request, Response } from 'express';
import { MessageNotFoundException } from '../../exceptions/HttpExceptions';
import { messageService, MessageService } from './message.service';

export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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
      const message = await this.messageService.findById(id);
      if (!message) {
        return next(new MessageNotFoundException(id));
      }
      response.json(message);
    } catch (error) {
      return next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      // filter by request query params
      const userOrGroupId = request.query.userOrGroupId as string;
      if (userOrGroupId) {
        const userId = request.user?.id;
        if (!userId) return;
        const messages = await this.messageService.filterBy(
          userId,
          userOrGroupId,
        );
        return response.json({ messages });
      }

      // if no request query params, return all
      const messages = await this.messageService.getAll();
      return response.json({ messages });
    } catch (error) {
      return next(error);
    }
  };

  send = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = request.user?.id;
      if (!userId) return;
      const { userOrGroupId, content } = request.body;
      const newMessage = await this.messageService.send(
        userId,
        userOrGroupId as string,
        content as string,
      );
      response.json({ message: newMessage });
    } catch (error) {
      return next(error);
    }
  };
}

export const messageController = new MessageController(messageService);
