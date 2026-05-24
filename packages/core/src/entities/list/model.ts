export interface List {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  projectId: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  syncStatus: "synced" | "pending" | "conflict";
}

export type CreateListInput = Pick<List, "title"> &
  Partial<Pick<List, "description" | "icon" | "color" | "projectId" | "sortOrder">>;

export type UpdateListInput = Partial<Pick<List, "title" | "description" | "icon" | "color" | "projectId" | "sortOrder">>;
