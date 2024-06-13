import { and, eq } from 'drizzle-orm';
import { groupSchema, userGroupSchema } from '../../schemas';
import { db } from '../../utils/db';

export class GroupRepository {
  findById = async (id: string) => {
    const group = await db.query.groupSchema.findFirst({
      where: eq(groupSchema.id, id),
    });
    return group;
  };

  findUserGroupRelationByUserIdAndGroupId = async (
    userId: string,
    groupId: string,
  ) => {
    const userGroupRelation = await db.query.userGroupSchema.findFirst({
      where: and(
        eq(userGroupSchema.userId, userId),
        eq(userGroupSchema.groupId, groupId),
      ),
    });
    return userGroupRelation;
  };

  getAll = async () => {
    const groups = db.select().from(groupSchema);
    return groups;
  };
}

export const groupRepository = new GroupRepository();
