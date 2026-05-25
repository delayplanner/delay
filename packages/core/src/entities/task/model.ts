export enum TaskStatus {
  Backlog = "backlog",
  Todo = "todo",
  InProgress = "in_progress",
  Done = "done",
  Cancelled = "cancelled",
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Urgent = "urgent",
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  listId: string | null;
  parentId: string | null;
  sortOrder: number;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  syncStatus: "synced" | "pending" | "conflict";
}

export type CreateTaskInput = Pick<Task, "title"> &
  Partial<Pick<Task, "description" | "status" | "priority" | "listId" | "parentId" | "dueDate" | "sortOrder">>;

export type UpdateTaskInput = Partial<Pick<Task, "title" | "description" | "status" | "priority" | "listId" | "parentId" | "dueDate" | "sortOrder">>;
