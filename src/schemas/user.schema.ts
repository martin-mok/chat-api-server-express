import type { InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const userSchema = pgTable('users', {
  id: uuid('id').notNull().primaryKey(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  isAdmin: boolean('is_admin').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectUserSchema = createSelectSchema(userSchema, {
  email: (schema) =>
    schema.email.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
});

export const updateUserSchema = z.object({
  body: selectUserSchema
    .pick({
      name: true,
      email: true,
    })
    .partial(),
});

export const newUserSchema = z.object({
  body: selectUserSchema.pick({
    name: true,
    email: true,
  }),
});

export type User = InferSelectModel<typeof userSchema>;
export type NewUser = z.infer<typeof newUserSchema>['body'];
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];
