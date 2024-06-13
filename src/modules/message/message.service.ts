import { GroupNotFoundException } from '../../exceptions/HttpExceptions';
import { messageRepository, MessageRepository } from './message.repository';

export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  findById = async (id: string) => {
    try {
      return await this.messageRepository.findById(id);
    } catch (error) {
      console.error(error);
      throw new GroupNotFoundException(id);
    }
  };

  getAll = async () => {
    return await this.messageRepository.getAll();
  };

  filterBy = async (userId: string, userOrGroupId: string) => {
    return await this.messageRepository.filterBy(userId, userOrGroupId);
  };

  send = async (sender: string, receiver: string, content: string) => {
    return await this.messageRepository.send(sender, receiver, content);
  };
}

export const messageService = new MessageService(messageRepository);
