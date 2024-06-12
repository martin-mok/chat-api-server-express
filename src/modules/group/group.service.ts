import { GroupNotFoundException } from '../../exceptions/HttpExceptions';
import { groupRepository, GroupRepository } from './group.repository';

export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  findById = async (id: string) => {
    try {
      return await this.groupRepository.findById(id);
    } catch (error) {
      console.error(error);
      throw new GroupNotFoundException(id);
    }
  };

  getAll = async () => {
    return await this.groupRepository.getAll();
  };
}

export const groupService = new GroupService(groupRepository);
