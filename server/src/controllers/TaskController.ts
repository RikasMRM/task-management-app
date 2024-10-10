import { Request, Response } from "express";
import { TaskModel, Task } from "../models/Task";

export const TaskController = {
  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createTask(req: Request, res: Response) {
    try {
      const task: Omit<Task, "id"> = req.body;
      const createdTask = await TaskModel.createTask(task);
      res.status(201).json(createdTask);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const task: Partial<Task> = req.body;
      const updatedTask = await TaskModel.updateTask(id, task);
      if (updatedTask) {
        res.json(updatedTask);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteTask(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await TaskModel.deleteTask(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
