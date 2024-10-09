export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  due_date: string;
  created_at: string;
  updated_at: string;
}

export type CreateTaskDTO = Omit<Task, "id" | "created_at" | "updated_at">;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;

export interface TaskFilters {
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}
