import { InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const messageSchema = pgTable('message', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content'),
  sender: uuid('sender_id').notNull(),
  // .references(() => userSchema.id),
  receiver: uuid('receiver_id').notNull(),
  toGroup: boolean('to_group').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// export const messageRelations = relations(messageSchema, ({ one }) => ({
//   sender: one(userSchema, {
//     fields: [messageSchema.sender],
//     references: [userSchema.id],
//   }),
// }));

export type Message = InferSelectModel<typeof messageSchema>;
export type InsertMessage = InferInsertModel<typeof messageSchema>;
export type CreateMessage = Required<
  Pick<InsertMessage, 'content' | 'sender'>
> &
  Partial<InsertMessage>;
