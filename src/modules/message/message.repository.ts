import { and, eq, or } from 'drizzle-orm';
import { messageSchema } from '../../schemas';
import { db } from '../../utils/db';

export class MessageRepository {
  findById = async (id: string) => {
    const message = await db.query.messageSchema.findFirst({
      where: eq(messageSchema.id, id),
    });
    return message;
  };

  getAll = async () => {
    const messages = db.select().from(messageSchema);
    return messages;
  };

  filterBy = async (userId: string, userOrGroupId: string) => {
    console.log(
      'in filterBy userId:',
      userId,
      ',userOrGroupId:',
      userOrGroupId,
    );
    const messages = db.query.messageSchema.findMany({
      where: or(
        and(
          eq(messageSchema.sender, userId),
          eq(messageSchema.receiver, userOrGroupId),
        ),
        and(
          eq(messageSchema.sender, userOrGroupId),
          eq(messageSchema.receiver, userId),
        ),
      ),
      orderBy: messageSchema.createdAt,
    });
    return messages;
  };
}

export const messageRepository = new MessageRepository();
