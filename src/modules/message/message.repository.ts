import { eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { messageSchema } from '../../schemas';

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
}

export const messageRepository = new MessageRepository();
