import { api } from '../lib/api'; import type { Task } from '../types/task';
export const taskApi={
  getTasks:(params:Record<string,string>)=>api.get<Task[]>('/tasks',{params}).then(r=>r.data),
  getTask:(taskId:string)=>api.get<Task>(`/tasks/${taskId}`).then(r=>r.data),
  createTask:(payload:Partial<Task>)=>api.post<Task>('/tasks',payload).then(r=>r.data),
  updateTask:(taskId:string,payload:Partial<Task>)=>api.patch<Task>(`/tasks/${taskId}`,payload).then(r=>r.data),
  deleteTask:(taskId:string)=>api.delete(`/tasks/${taskId}`),
  list:(params:Record<string,string>)=>api.get<Task[]>('/tasks',{params}).then(r=>r.data),
  get:(taskId:string)=>api.get<Task>(`/tasks/${taskId}`).then(r=>r.data)
};
