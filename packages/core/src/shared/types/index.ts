import type { Task } from "../../entities/task";
import type { List } from "../../entities/list";

export type EntityType = "task" | "list";

export type SyncAction = "create" | "update" | "delete";

export interface SyncQueueItem {
  id: string;
  entityType: EntityType;
  entityId: string;
  action: SyncAction;
  payload: unknown;
  createdAt: string;
  retryCount: number;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export interface DateRangeFilter {
  start: string;
  end: string;
}

export type ViewMode = "day" | "week" | "month" | "list";

export interface TaskGroup {
  date: string;
  label: string;
  tasks: Task[];
}

export interface TaskWithList extends Task {
  list: List | null;
}
