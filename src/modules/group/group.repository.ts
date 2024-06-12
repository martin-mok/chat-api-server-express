import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { groupSchema } from '../../schemas';

export class GroupRepository {
  findById = async (id: string) => {
    const user = await db.query.groupSchema.findFirst({
      where: eq(groupSchema.id, id),
    });
    return user;
  };

  getAll = async () => {
    const users = db.select().from(groupSchema);
    return users;
  };
}

export const groupRepository = new GroupRepository();
