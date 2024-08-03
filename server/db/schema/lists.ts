import { index, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

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