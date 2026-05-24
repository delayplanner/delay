export enum TaskStatus {
  Backlog = "backlog",
  Todo = "todo",
  InProgress = "in_progress",
  Done = "done",
  Cancelled = "cancelled",
}

export enum TaskPriority {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4,
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
