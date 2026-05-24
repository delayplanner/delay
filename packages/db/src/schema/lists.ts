import { pgTable, text, integer, timestamp, index } from "drizzle-orm/pg-core";
import { syncStatusEnum } from "./tasks";

export const lists = pgTable(
  "lists",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    icon: text("icon"),
    color: text("color"),
    projectId: text("project_id"),
    sortOrder: integer("sort_order").notNull().default(1000),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    syncStatus: syncStatusEnum("sync_status").notNull().default("synced"),
    userId: text("user_id").notNull(),
  },
  (table) => ({
    userIdIdx: index("lists_user_id_idx").on(table.userId),
    projectIdIdx: index("lists_project_id_idx").on(table.projectId),
  }),
);
