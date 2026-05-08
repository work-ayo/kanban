import { api } from '../lib/api'; import type { Task } from '../types/task';
export const taskApi={list:(params:Record<string,string>)=>api.get<Task[]>('/tasks',{params}).then(r=>r.data),get:(taskId:string)=>api.get<Task>(`/tasks/${taskId}`).then(r=>r.data)};
