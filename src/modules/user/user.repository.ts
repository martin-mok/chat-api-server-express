import { eq } from 'drizzle-orm';
import { userSchema } from '../../schemas';
import { db } from '../../utils/db';

export class UserRepository {
  findById = async (id: string) => {
    // select().from(userSchema).where(eq(userSchema.id, id)).limit(1);
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, id),
    });
    return user;
  };

  getAll = async () => {
    const users = db.select().from(userSchema);
    // const users = await db.query.userSchema.findMany();
    return users;
  };
}

export const userRepository = new UserRepository();
