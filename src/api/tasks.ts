import api from './axios';
import { Task } from '../types';

export const getTasks = async () => {
  const response = await api.get<Task[]>('/api/v1/me/tasks');
  return response.data;
};

export const getTask = async (id: number) => {
  const response = await api.get<Task>(`/api/v1/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  assignee_id: number | null;
}) => {
  const response = await api.post<Task>(`/api/v1/tasks`, {
    task: taskData
  });
  return response.data;
};

export const updateTask = async (id: number, taskData: {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  assignee_id: number | null;
}) => {
  const response = await api.patch<Task>(`/api/v1/tasks/${id}`, {
    task: taskData
  });
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/api/v1/tasks/${id}`);
  return response.data;
};
