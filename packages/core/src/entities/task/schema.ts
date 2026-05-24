import { z } from "zod";
import { TaskStatus, TaskPriority } from "./model";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(500),
  description: z.string().nullable(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  listId: z.string().nullable(),
  parentId: z.string().nullable(),
  sortOrder: z.number(),
  dueDate: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  syncStatus: z.enum(["synced", "pending", "conflict"]),
});

export const createTaskSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(10000).optional().nullable(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  listId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  dueDate: z.string().datetime().optional().nullable(),
  sortOrder: z.number().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().max(10000).optional().nullable(),
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  listId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  dueDate: z.string().datetime().optional().nullable(),
  sortOrder: z.number().optional(),
});
