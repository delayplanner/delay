import type { Task, CreateTaskInput } from "../../entities/task";
import { createTaskSchema, TaskStatus, TaskPriority } from "../../entities/task";
import { generateId } from "../../shared/lib";

export interface CreateTaskCommand extends CreateTaskInput {}

export function createTaskUseCase(
  command: CreateTaskCommand,
  now: string = new Date().toISOString(),
): Task {
  const parsed = createTaskSchema.parse(command);

  return {
    id: generateId(),
    title: parsed.title,
    description: parsed.description ?? null,
    status: parsed.status ?? TaskStatus.Todo,
    priority: parsed.priority ?? TaskPriority.Medium,
    listId: parsed.listId ?? null,
    parentId: parsed.parentId ?? null,
    sortOrder: parsed.sortOrder ?? 1000,
    dueDate: parsed.dueDate ?? null,
    completedAt: null,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    syncStatus: "pending",
  };
}
