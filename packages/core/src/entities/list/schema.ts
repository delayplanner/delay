import { z } from "zod";

export const listSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  projectId: z.string().nullable(),
  sortOrder: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  syncStatus: z.enum(["synced", "pending", "conflict"]),
});

export const createListSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().nullable(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  sortOrder: z.number().optional(),
});

export const updateListSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  icon: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  sortOrder: z.number().optional(),
});
