import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { groupSchema } from '../../schemas';

export class GroupRepository {
  findById = async (id: string) => {
    const group = await db.query.groupSchema.findFirst({
      where: eq(groupSchema.id, id),
    });
    return group;
  };

  getAll = async () => {
    const groups = db.select().from(groupSchema);
    return groups;
  };
}

export const groupRepository = new GroupRepository();
