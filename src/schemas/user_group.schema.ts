import { relations, type InferSelectModel } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { groupSchema } from './group.schema';
import { userSchema } from './user.schema';

export const userGroupSchema = pgTable(
  'users_group',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => userSchema.id),
    groupId: uuid('group_id')
      .notNull()
      .references(() => groupSchema.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  }),
);

export const userGroupsRelations = relations(userGroupSchema, ({ one }) => ({
  group: one(groupSchema, {
    fields: [userGroupSchema.groupId],
    references: [groupSchema.id],
  }),
  user: one(userSchema, {
    fields: [userGroupSchema.userId],
    references: [userSchema.id],
  }),
}));

export type Group = InferSelectModel<typeof userGroupSchema>;
