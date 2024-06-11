import { eq } from 'drizzle-orm';
import { userSchema } from '../../schemas';
import { db } from '../../utils/db';
import { UserNotFoundException } from '../../exceptions/HttpExceptions';

export class UserService {
  constructor() {}

  findById = async (id: string) => {
    try {
      // select().from(userSchema).where(eq(userSchema.id, id)).limit(1);
      const user = await db.query.userSchema.findFirst({
        where: eq(userSchema.id, id),
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new UserNotFoundException(id);
    }
  };

  getAll = async () => {
    const users = db.select().from(userSchema);
    // const users = await db.query.userSchema.findMany();
    return users;
  };
}

export const userService = new UserService();
