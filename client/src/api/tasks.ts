import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:3000/api";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

export const searchTasks = async (searchTerm: string): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks?search=${searchTerm}`);
  return response.data;
};
