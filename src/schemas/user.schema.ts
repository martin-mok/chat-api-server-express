import { InferSelectModel, relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { messageSchema } from './message.schema';
import { userGroupSchema } from './user_group.schema';

export const userSchema = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  isAdmin: boolean('is_admin').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  userGroup: many(userGroupSchema),
  message: many(messageSchema),
}));

export type User = InferSelectModel<typeof userSchema>;
export type TokenUser = Required<Pick<User, 'id'>> & Partial<User>;
