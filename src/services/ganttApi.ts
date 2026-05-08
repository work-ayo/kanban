import { api } from '../lib/api'; import type { GanttTask } from '../types/gantt';
export const ganttApi={list:(teamId:string,projectId?:string)=>api.get<GanttTask[]>('/gantt',{params:{teamId,projectId}}).then(r=>r.data)};
