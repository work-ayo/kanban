import { api } from '../lib/api';
export const ganttApi={
  getGantt:(params:any)=>api.get('/gantt',{params}).then(r=>r.data),
  updateTaskSchedule:(taskId:string,payload:any)=>api.patch(`/gantt/tasks/${taskId}/schedule`,payload).then(r=>r.data),
  list:(teamId:string,projectId?:string)=>api.get('/gantt',{params:{teamId,projectId}}).then(r=>r.data)
};
