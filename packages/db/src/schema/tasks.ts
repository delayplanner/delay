import {
  pgTable,
  text,
  integer,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("task_status", [
  "backlog",
  "todo",
  "in_progress",
  "done",
  "cancelled",
]);

export const taskPriorityEnum = pgEnum("task_priority", [0, 1, 2, 3, 4]);

export const syncStatusEnum = pgEnum("sync_status", [
  "synced",
  "pending",
  "conflict",
]);

export const tasks = pgTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    status: taskStatusEnum("status").notNull().default("todo"),
    priority: taskPriorityEnum("priority").notNull().default("0"),
    listId: text("list_id"),
    parentId: text("parent_id"),
    sortOrder: integer("sort_order").notNull().default(1000),
    dueDate: timestamp("due_date", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
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
    userIdIdx: index("tasks_user_id_idx").on(table.userId),
    listIdIdx: index("tasks_list_id_idx").on(table.listId),
    dueDateIdx: index("tasks_due_date_idx").on(table.dueDate),
    statusIdx: index("tasks_status_idx").on(table.status),
    parentIdIdx: index("tasks_parent_id_idx").on(table.parentId),
  }),
);
