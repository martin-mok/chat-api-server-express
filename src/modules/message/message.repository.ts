import { eq } from 'drizzle-orm';
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

  filterBy = async () => {
    const messages = db.select().from(messageSchema);
    return messages;
  };
}

export const messageRepository = new MessageRepository();
