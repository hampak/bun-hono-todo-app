import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow()
},
  // (todos) => {
  //   return {
  //     userIdIndex: index("name_idx").on(todos.userId)
  //   }
  // }
);

export const lists = pgTable('lists', {
  id: serial('id').primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow()
},
  // (lists) => {
  //   return {
  //     userIdIndex: index("name_idx").on(lists.userId)
  //   }
  // }
);

export type Lists = typeof lists.$inferSelect