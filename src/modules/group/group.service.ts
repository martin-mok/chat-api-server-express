import {
  GroupNotFoundException,
  InternalException,
} from '../../exceptions/HttpExceptions';
import { userGroupSchema } from '../../schemas';
import { Group } from '../../schemas/group.schema';
import { db } from '../../utils/db';
import { groupRepository, GroupRepository } from './group.repository';

interface JoinGroup {
  userId: string;
  groupId: string;
}

export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  findById = async (id: string): Promise<Group> => {
    try {
      const group = await this.groupRepository.findById(id);
      if (!group) {
        throw new GroupNotFoundException(id);
      }
      return group;
    } catch (error) {
      console.error(error);
      throw new InternalException();
    }
  };

  getAll = async () => {
    return await this.groupRepository.getAll();
  };

  joinGroup = async (data: JoinGroup) => {
    const { userId, groupId } = data;
    const group = await this.findById(groupId);
    const userGroupRelation =
      await this.groupRepository.findUserGroupRelationByUserIdAndGroupId(
        userId,
        groupId,
      );
    if (userGroupRelation) {
      // already joined
      return;
    }
    const newUserGroupRelation = await db
      .insert(userGroupSchema)
      .values({ userId, groupId: group.id })
      .returning();
    console.log('newUserGroupRelation:', newUserGroupRelation);
    return newUserGroupRelation;
  };
}

export const groupService = new GroupService(groupRepository);
