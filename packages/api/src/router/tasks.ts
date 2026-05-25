import { z } from "zod";
import { router, protectedProcedure } from "../server";
import { createTaskSchema, updateTaskSchema } from "@delay/core/entities/task";
import { createTaskUseCase } from "@delay/core/features/create-task";
import { tasks } from "@delay/db/schema";
import { desc, eq, and, isNull } from "drizzle-orm";


export const tasksRouter = router({
  getAll: protectedProcedure
    .input(
      z
        .object({
          listId: z.string().optional(),
          status: z.string().optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(tasks.userId, ctx.userId), isNull(tasks.deletedAt)];

      if (input?.listId) {
        conditions.push(eq(tasks.listId, input.listId));
      }
      if (input?.status) {
        conditions.push(eq(tasks.status, input.status));
      }

      const items = await ctx.db
        .select()
        .from(tasks)
        .where(and(...conditions))
        .orderBy(desc(tasks.sortOrder))
        .limit(input?.limit ?? 50)
        .offset(input?.offset ?? 0);

      return items;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [task] = await ctx.db
        .select()
        .from(tasks)
        .where(
          and(eq(tasks.id, input.id), eq(tasks.userId, ctx.userId)),
        )
        .limit(1);

      return task ?? null;
    }),

  create: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const task = createTaskUseCase(input);
      await ctx.db.insert(tasks).values({
        ...task,
        userId: ctx.userId,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      });
      return task;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), data: updateTaskSchema }))
    .mutation(async ({ ctx, input }) => {
      const updateData: Record<string, unknown> = { ...input.data };
      if (input.data.dueDate) {
        updateData.dueDate = new Date(input.data.dueDate);
      }

      await ctx.db
        .update(tasks)
        .set({ ...updateData, updatedAt: new Date() })
        .where(
          and(eq(tasks.id, input.id), eq(tasks.userId, ctx.userId)),
        );

      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ deletedAt: new Date(), updatedAt: new Date() })
        .where(
          and(eq(tasks.id, input.id), eq(tasks.userId, ctx.userId)),
        );

      return { success: true };
    }),
});
