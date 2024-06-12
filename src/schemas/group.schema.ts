import { relations, type InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { userGroupSchema } from './user_group.schema';

export const groupSchema = pgTable('group', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const groupRelations = relations(groupSchema, ({ many }) => ({
  userGroup: many(userGroupSchema),
}));

export type Group = InferSelectModel<typeof groupSchema>;
