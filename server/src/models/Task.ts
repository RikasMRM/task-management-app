import db from "../config/database";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  due_date: Date;
}

export const TaskModel = {
  async getAllTasks(): Promise<Task[]> {
    return db("tasks").select("*");
  },

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    const [createdTask] = await db("tasks").insert(task).returning("*");
    return createdTask;
  },

  async updateTask(id: number, task: Partial<Task>): Promise<Task | null> {
    const [updatedTask] = await db("tasks")
      .where({ id })
      .update(task)
      .returning("*");
    return updatedTask || null;
  },

  async deleteTask(id: number): Promise<boolean> {
    const deletedCount = await db("tasks").where({ id }).del();
    return deletedCount > 0;
  },
};
